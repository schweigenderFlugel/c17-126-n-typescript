import { NextFunction, Request, Response } from 'express'
import { UniqueConstraintError } from 'sequelize'
import { TokenExpiredError } from 'jsonwebtoken'
import * as crypto from 'node:crypto'
import { IAuth, INewAuthResponse, ISign, ITokenPayload, IUpdateAuth } from '../interfaces/auth.interface'
import { createHash, isValidPassword } from '../utils/bcrypt.utils'
import authService from '../services/auth.services'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { HTTP_STATUS, envs } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import CookiesUtils from '../utils/cookies.utils';
import JwtUtils from '../utils/jwt.utils'
import { ENVIROMENTS } from '../../enviroments';
import sessionService from '../services/session.service'
import { ISession } from '../interfaces/session.interface'
import CodeUtils from '../utils/activation-code.utils'

const { NODE_ENV, HTTPONLY_COOKIE_NAME, DB_URL } = envs

const cookieName =
  NODE_ENV === ENVIROMENTS.PRODUCTION ? HTTPONLY_COOKIE_NAME : 'bankme'

export default class authsController {
  /**
   * Sign up a new user authentication with the provided request body data.
   *
   * @param {Request} req - the request object containing new user auth data
   * @param {Response} res - the response object to send the created user auth data
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the user auth is created
   */
  static async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const payload: ISign = {
        id: crypto.randomUUID(),
        email: req.body.email as IAuth['email'],
        password: req.body.password as IAuth['password'],
      }
      payload.password = createHash(payload.password)
      const newAuth = await authService.createAuth(payload);
      const newAuthResponse:  INewAuthResponse = {
        email: newAuth.email,
        role: newAuth.role,
        status: newAuth.status,
      }
      const response = apiSuccessResponse(newAuthResponse)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err: any) {
      if (err instanceof UniqueConstraintError) {
        next(
          new HttpError(
            'Validation error',
            'The user already exists',
            HTTP_STATUS.CONFLICT
          )
        )
      } else {
        next(err)
      }
    }
  }

  /**
   * Login with an existing user.
   *
   * @param {Request} req - the request object containing auth data
   * @param {Response} res - the response object to send an access token
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the auth data is valid
   */
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const jwtCookie = req.cookies[cookieName]
      const userAgent = req.headers['user-agent'] ?? 'unknown';
      const activationCode = CodeUtils.generateActivationCode();
      if (jwtCookie) throw new HttpError(
        'Session open', 
        'Cookie is still existing', 
        HTTP_STATUS.BAD_REQUEST,
      )
      const payload: ISign = req.body;
      const authFound = await authService.getAuthByEmail(payload.email)
      if (!authFound) throw new HttpError(
        'Invalid Credentials',
        'Auth not found',
        HTTP_STATUS.NOT_FOUND
      )
      const validPassword = isValidPassword(
        authFound.password,
        payload.password
      )
      if (!validPassword) throw new HttpError(
        'Invalid Credentials',
        'Must provide valid credentials',
        HTTP_STATUS.UNAUTHORIZED
      )
      if (authFound.status === false) {
        const updatePayload: Partial<IAuth> = {
          activationCode: activationCode,
        }
        await authService.updateAuth(authFound.id, updatePayload)
        throw new HttpError(
          'The authentication is not activ',
          'The authentication is not activ',
          HTTP_STATUS.FORBIDDEN,
        )
      }
      const tokenPayload: ITokenPayload = {
        id: authFound.id,
        role: authFound.role,
      }
      const accessToken = await JwtUtils.generateToken(tokenPayload);
      const refreshToken = await JwtUtils.generateRefreshToken(tokenPayload);
      const sessionsFound = await sessionService.getSessionsByAuthId(authFound.id);
      const sessionFiltered = sessionsFound.find(session => session.userAgent === userAgent);
      const updateSessionPayload: Partial<ISession> = {
        refreshToken: refreshToken,
        lastEntry: new Date(),
      }
      const newSessionPayload: ISession = {
        id: crypto.randomUUID(),
        authId: authFound.id,
        refreshToken: refreshToken,
        userAgent: userAgent,
        lastEntry: new Date(),
      }
      if (sessionFiltered) sessionService.updateSession(sessionFiltered.id, updateSessionPayload)
      else sessionService.createSession(newSessionPayload);
      await CookiesUtils.setJwtCookie(cookieName, res, refreshToken)
      console.log(activationCode);
      res.status(HTTP_STATUS.OK).json({ accessToken, refreshToken })
    } catch (err: any) {
      next(err)
    }
  }

  /**
   * Refresh session with the refresh token.
   *
   * @param {Request} req - the request object containig a cookie with the refresh token
   * @param {Response} res - the response object to send a new access token
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the refresh token is still valid
   */
  static async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const jwtCookie = req.cookies[cookieName];
      const userAgent = req.headers['user-agent'] ?? 'unknown';
      if (!jwtCookie) throw new HttpError(
        'Refresh token not found', 
        'Refresh token should exist to refresh', 
        HTTP_STATUS.NOT_FOUND
      )
      const verified = await JwtUtils.verifyRefreshToken(jwtCookie);
      const authFound = await authService.getAuthById(verified.id);
      if (!authFound) {
        await CookiesUtils.removeJwtCookie(cookieName, res);
        throw new HttpError(
          'Invalid Credentials',
          'Auth not Found',
          HTTP_STATUS.NOT_FOUND,
        )
      }
      const sessionsFound = await sessionService.getSessionsByAuthId(authFound.id);
      const sessionFiltered = sessionsFound.find(session => 
        session.refreshToken === jwtCookie && session.userAgent === userAgent
      )
      await CookiesUtils.removeJwtCookie(cookieName, res)
      const payload: ITokenPayload = { id: authFound.id, role: authFound.role }
      const newAccessToken = await JwtUtils.generateToken(payload)
      const newRefreshToken = await JwtUtils.generateRefreshToken(payload)
      await CookiesUtils.setJwtCookie(cookieName, res, newRefreshToken)
      const updateSessionPayload: Partial<ISession> = {
        refreshToken: newRefreshToken
      }
      const newSessionPayload: ISession = {
        id: crypto.randomUUID(),
        authId: authFound.id,
        refreshToken: newRefreshToken,
        userAgent: userAgent,
        lastEntry: new Date(),
      }

      if (sessionFiltered) sessionService.updateSession(sessionFiltered.id, updateSessionPayload)
      else sessionService.createSession(newSessionPayload);

      res.status(HTTP_STATUS.OK).json({ accessToken: newAccessToken })
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        next(new HttpError(err.message, err.stack, HTTP_STATUS.FORBIDDEN))
      } else {
        next(err)
      }
    }
  }

  /**
   * Change the password.
   *
   * @param {Request} req - the request object containing the param with the id and provided request body data
   * @param {Response} res - the response object with message of user updated
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the password is updated
   */
  static async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as unknown as IAuth['id'];
      const tokenPayload: ITokenPayload = req.user as ITokenPayload
      const body: IUpdateAuth = req.body
      const authFound = await authService.getAuthById(id);
      if (!tokenPayload || !tokenPayload.id) throw new HttpError(
        'Token payload error',
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )
      if(!authFound) throw new HttpError(
        'User not found',
        'User not found',
        HTTP_STATUS.NOT_FOUND
      )
      if (authFound.id != tokenPayload.id) throw new HttpError(
        'You are not allowed to perform this action',
        'Conflict with id and the id from token payload',
        HTTP_STATUS.CONFLICT
      )
      const validPassword = isValidPassword(
        authFound.password,
        body.currentPassword
      )
      if (!validPassword) throw new HttpError(
        'You are not allowed to perform this action',
        'The password is invalid',
        HTTP_STATUS.UNAUTHORIZED
      )
      if (body.currentPassword === body.newPassword) throw new HttpError(
        'The password should not be the same',
        'The password should not be the same',
        HTTP_STATUS.NOT_ACCEPTABLE
      )
      const newData: Partial<IUpdateAuth> = {
        password: createHash(body.newPassword),
        updatedAt: new Date(),
      }
      await authService.updateAuth(id, newData);
      res.status(HTTP_STATUS.CREATED).json({ message: 'user authentication updated' })
    } catch (error) {
      next(error);
    }
  }

  /**
   * Restore password process.
   *
   * @param {Request} req - the request object containing the email
   * @param {Response} res - the response object to send a link with the recovery token
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the email is valid
   */
  static async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const payload: ISign = req.body;
      const authFound = await authService.getAuthByEmail(payload.email);
      if(!authFound) throw new HttpError(
        'User not found',
        'User not found',
        HTTP_STATUS.NOT_FOUND
      )
      const payloadToken: Omit<ITokenPayload, 'role'> = {
        id: authFound.id,
      }
      const recoveryToken = await JwtUtils.generateRecoveryToken(payloadToken);
      res.status(HTTP_STATUS.OK).json({ link: `${DB_URL}/restablecer-contrasena/${recoveryToken}`})
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout the session.
   *
   * @param {Request} req - the request object containig a cookie with the refresh token
   * @param {Response} res - the response object to send the message "logout successfully"
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the refresh token is still valid
   */
  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const jwtCookie = req.cookies[cookieName]
      const userAgent = req.headers['user-agent'] ?? 'unknown';
      if (!jwtCookie) throw new HttpError(
        'Cookie not found',
        'Cookie should exist to logout',
        HTTP_STATUS.NOT_FOUND
      )
      const verified = await JwtUtils.verifyRefreshToken(jwtCookie);
      const authFound = await authService.getAuthById(verified.id);
      const sessionsFound = await sessionService.getSessionsByAuthId(authFound.id);
      const sessionFiltered = sessionsFound.find(session => 
        session.userAgent === userAgent && session.refreshToken === jwtCookie
      )
      const updateSessionPayload: Partial<ISession> = {
        refreshToken: null
      }
      await sessionService.updateSession(
        sessionFiltered?.id as ISession['id'], 
        updateSessionPayload
      )
      await CookiesUtils.removeJwtCookie(cookieName, res)
      res.status(HTTP_STATUS.OK).json({ message: 'logout succesfully' })
    } catch (err: any) {
      next(err)
    }
  }
}
