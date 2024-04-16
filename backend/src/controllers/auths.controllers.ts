import { Request, Response } from 'express'
import { IAuth } from '../interfaces/auth.interface';
import { ITokenPayload } from '../interfaces/token.interface';
import { createHash, isValidPassword } from '../utils/bcrypt.utils'
import authService from '../services/auth.services'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { HTTP_STATUS, envs } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import SessionUtils from '../utils/session.util';
import CookiesUtils from '../utils/cookies.utils';
import { UniqueConstraintError } from 'sequelize';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export default class authsController {
  /**
   * A description of the entire function.
   *
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @return {Promise<Response>} response containing the result of the operation
   */
  static async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const payload: IAuth = req.body;
      payload.password = createHash(payload.password);
      const newAuth = await authService.createAuth(payload);
      const response = apiSuccessResponse(newAuth);
      return res.status(HTTP_STATUS.CREATED).json(response);
    } catch (err: any) {
      if (err instanceof UniqueConstraintError) {
        const response: HttpError = new HttpError(
          err.message, err.stack, 409
        )
        return res.status(409 || HTTP_STATUS.SERVER_ERROR).json(response)
      } else {
        // console.log(err) // FIXME: Replace with a Morgan
        const response: HttpError = new HttpError(
          err.description || err.message,
          err.details || err.message
        )
        return res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response)
      }
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const payload: IAuth = req.body;
      const authFound = await authService.getAuthByEmail(payload.email);
      isValidPassword(authFound.password, payload.password)
      const tokenPayload: ITokenPayload = { 
        id: authFound.id,
        role: authFound.role,
      }
      const accessToken = await SessionUtils.generateToken(tokenPayload);
      const refreshToken = await SessionUtils.generateRefreshToken(tokenPayload);
      await CookiesUtils.setJwtCookie(res, refreshToken)
      return res.json({ accessToken });
    } catch (err: any) {
      // console.error(err)
      const response: HttpError = new HttpError(
        err.description || err.message,
        err.details || err.message
      )
      return res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response)
    }
  }

  static async refresh(req: Request, res: Response): Promise<Response> {
    try {
      const jwtCookie = req.cookies[envs.HTTPONLY_COOKIE_NAME];
      if (!jwtCookie) throw new HttpError('cookie not found', 'Not Found', 404);
      const verified = await SessionUtils.verifyRefreshToken(jwtCookie);
      const payload: ITokenPayload = { id: verified.id, role: verified.role }
      const newToken = await SessionUtils.generateToken(payload);
      return res.json({ accessToken: newToken });
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        const response: HttpError = new HttpError(
          err.message, err.stack, 403
        )
        return res.status(403 || HTTP_STATUS.FORBIDDEN).json(response)
      } else {
        const response: HttpError = new HttpError(
          err.description || err.message,
          err.details || err.message
        )
        return res.status(err.status || HTTP_STATUS.NOT_FOUND).json(response)
      }
    }
  }

  static async logout(res: Response): Promise<void | Response> {
    try {
      await CookiesUtils.removeJwtCookie(res);
    } catch (err: any) {
      const response: HttpError = new HttpError(
        err.description || err.message,
        err.details || err.message
      )
      return res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response)
    }
  }
}
