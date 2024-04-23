import { NextFunction, Request, Response } from 'express'
import { UniqueConstraintError } from 'sequelize'
import { TokenExpiredError } from 'jsonwebtoken'
import { ISign } from '../interfaces/auth.interface'
import { ITokenPayload } from '../interfaces/token.interface'
import { createHash, isValidPassword } from '../utils/bcrypt.utils'
import authService from '../services/auth.services'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { HTTP_STATUS, envs } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import SessionUtils from '../utils/session.util'
import CookiesUtils from '../utils/cookies.utils'
import { ENVIROMENTS } from '../../enviroments'

const { NODE_ENV, HTTPONLY_COOKIE_NAME } = envs

const cookieName =
  NODE_ENV === ENVIROMENTS.PRODUCTION ? HTTPONLY_COOKIE_NAME : 'bankme'

export default class authsController {
  /**
   * Sign up a new user.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @param {NextFunction} next - the next function
   * @return {Promise<void>} a promise that resolves to void
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
          'Must provide valid credentials',
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
      const accessToken = await SessionUtils.generateToken(tokenPayload)
      const refreshToken = await SessionUtils.generateRefreshToken(tokenPayload)
      await CookiesUtils.setJwtCookie(res, refreshToken)
      res.status(HTTP_STATUS.OK).json({ accessToken })
    } catch (err: any) {
      next(err)
    }
  }

  static async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const jwtCookie = req.cookies[cookieName]
      if (!jwtCookie)
        throw new HttpError(
          'Cookie not found',
          'Cookie should exist to refresh',
          404
        )
      const verified = await SessionUtils.verifyRefreshToken(jwtCookie)
      const payload: ITokenPayload = { id: verified.id, role: verified.role }
      const newToken = await SessionUtils.generateToken(payload)
      res.status(HTTP_STATUS.OK).json({ accessToken: newToken })
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        next(new HttpError(err.message, err.stack, 403))
      } else {
        next(err)
      }
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const jwtCookie = req.cookies[cookieName]
      if (!jwtCookie)
        throw new HttpError(
          'Cookie not found',
          'Cookie should exist to logout',
          404
        )
      await CookiesUtils.removeJwtCookie(res)
      res.status(HTTP_STATUS.OK).json({ message: 'logout succesfully' })
    } catch (err: any) {
      next(err)
    }
  }
}
