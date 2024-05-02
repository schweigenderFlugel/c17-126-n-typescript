import { NextFunction, Request, Response } from 'express'
import { UniqueConstraintError } from 'sequelize'
import { TokenExpiredError } from 'jsonwebtoken'
import { ISign, IUpdateAuth } from '../interfaces/auth.interface'
import { ITokenPayload } from '../interfaces/token.interface'
import { createHash, isValidPassword } from '../utils/bcrypt.utils'
import authService from '../services/auth.services'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { HTTP_STATUS, envs } from '../config/constants'
import HttpError from '../utils/HttpError.utils'

import SessionUtils from '../utils/session.util';
import CookiesUtils from '../utils/cookies.utils';
import { ENVIROMENTS } from '../../enviroments';
import CryptoUtils from '../utils/crypto.utils'

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
      const payload: ISign = req.body
      payload.password = createHash(payload.password)
      const newAuth = await authService.createAuth(payload)
      const response = apiSuccessResponse(newAuth)
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
      if (jwtCookie)
        throw new HttpError('Session open', 'Cookie is still existing', 400)
      const payload: ISign = req.body
      const authFound = await authService.getAuthByEmail(payload.email)
      if (!authFound)
        throw new HttpError(
          'Invalid Credentials',
          'Auth not found',
          HTTP_STATUS.NOT_FOUND
        )
      const validPassword = isValidPassword(
        authFound.password,
        payload.password
      )
      if (!validPassword)
        throw new HttpError(
          'Invalid Credentials',
          'Must provide valid credentials',
          HTTP_STATUS.UNAUTHORIZED
        )
      const tokenPayload: ITokenPayload = {
        id: authFound.id,
        role: authFound.role,
      }
      const accessToken = await SessionUtils.generateToken(tokenPayload);
      const refreshToken = await SessionUtils.generateRefreshToken(tokenPayload);
      await CookiesUtils.setJwtCookie(cookieName, res, refreshToken)
      res.status(HTTP_STATUS.OK).json({ accessToken })
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
      if (!jwtCookie) 
        throw new HttpError(
          'Refresh token not found', 
          'Refresh token should exist to refresh', 
          HTTP_STATUS.NOT_FOUND
        )
      await CookiesUtils.removeJwtCookie(cookieName, res)
      const verified = await SessionUtils.verifyRefreshToken(jwtCookie)
      const authFound = await authService.getAuthById(verified.id);
      if (!authFound) {
        await CookiesUtils.removeJwtCookie(cookieName, res);
        throw new HttpError(
          'Invalid Credentials',
          'Auth not Found',
          HTTP_STATUS.NOT_FOUND,
        )
      }
      const payload: ITokenPayload = { id: authFound.id, role: authFound.role }
      const newAccessToken = await SessionUtils.generateToken(payload)
      const newRefreshToken = await SessionUtils.generateRefreshToken(payload)
      await CookiesUtils.setJwtCookie(cookieName, res, newRefreshToken)
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
      const id = req.params.id as unknown as number;
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
        HTTP_STATUS.BAD_REQUEST
      )
      const newData: Partial<IUpdateAuth> = {
        password: createHash(body.newPassword),
        updatedAt: new Date(),
      }
      await authService.updateAuth(id, newData);
      res.status(HTTP_STATUS.CREATED).json({ message: 'user authentication updated' })
    } catch (error) {
      console.log(error)
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
      const recoveryToken = await SessionUtils.generateRecoveryToken(payloadToken);
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
      if (!jwtCookie) throw new HttpError(
        'Cookie not found',
        'Cookie should exist to logout',
        HTTP_STATUS.NOT_FOUND
      )
      await CookiesUtils.removeJwtCookie(cookieName, res)
      res.status(HTTP_STATUS.OK).json({ message: 'logout succesfully' })
    } catch (err: any) {
      next(err)
    }
  }
}
