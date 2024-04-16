import { NextFunction, Request, Response } from 'express'
import { IAuth } from '../interfaces/auth.interface'
import { ITokenPayload } from '../interfaces/token.interface'
import { createHash, isValidPassword } from '../utils/bcrypt.utils'
import authService from '../services/auth.services'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import SessionUtils from '../utils/session.util'

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
    const payload: IAuth = req.body
    payload.password = createHash(payload.password)
    try {
      const newAuth = await authService.createAuth(payload)
      const response = apiSuccessResponse(newAuth)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err: any) {
      next(err)
    }
  }

  /**
   * Authenticates a user with the provided email and password.
   *
   * @param {Request} req - the request object containing user data
   * @param {Response} res - the response object to send the created user data
   * @param {NextFunction} next - the next function in the middleware chain
   * @return {Promise<void>} a promise that resolves when the user is authenticated
   * @throws {HttpError} if the credentials are invalid
   */
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const payload: IAuth = req.body
    try {
      const authFound = await authService.getAuthByEmail(payload.email)
      if (!authFound) {
        throw new HttpError(
          'Invalid Credentials',
          'Must provide valid credentials',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const validPassword = isValidPassword(
        authFound.password,
        payload.password
      )

      if (!validPassword) {
        throw new HttpError(
          'Invalid Credentials',
          'Must provide valid credentials',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const tokenPayload: ITokenPayload = {
        id: authFound.id,
        role: authFound.role,
      }
      const accessToken = await SessionUtils.generateToken(tokenPayload)

      res.status(HTTP_STATUS.OK).json({ accessToken })
    } catch (err: any) {
      next(err)
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {}
}
