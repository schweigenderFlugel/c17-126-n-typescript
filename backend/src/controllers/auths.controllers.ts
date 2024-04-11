import { Request, Response } from 'express'
import { IAuth } from '../interfaces/auth.interface';
import { ITokenPayload } from '../interfaces/token.interface';
import { createHash, isValidPassword } from '../utils/bcrypt.utils'
import authService from '../services/auth.services'
import apiSuccessResponse from '../utils/apiResponse.utils'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import SessionUtils from '../utils/session.util';

export default class authsController {
  /**
   * A description of the entire function.
   *
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @return {Promise<Response>} response containing the result of the operation
   */
  static async signUp(req: Request, res: Response): Promise<Response> {
    const payload: IAuth = req.body
    payload.password = createHash(payload.password)
    try {
      const newAuth = await authService.createAuth(payload)
      const response = apiSuccessResponse(newAuth)
      return res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err: any) {
      console.log(err) // FIXME: Replace with a Morgan
      const response: HttpError = new HttpError(
        err.description || err.message,
        err.details || err.message
      )
      return res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response)
    }
  }

  static async login(req: Request, res: Response): Promise<string> {
    const payload: IAuth = req.body;
      const authFound = await authService.getAuthByEmail(payload.email);
      const userPassword = authFound?.password ?? '';
      isValidPassword(userPassword, payload.password);
      const tokenPayload: ITokenPayload = { id: authFound?.id ?? 0 }
      const accessToken = SessionUtils.generateToken(tokenPayload);
      return accessToken
  }
}
