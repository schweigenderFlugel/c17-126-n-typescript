import { decode, sign, verify } from 'jsonwebtoken'
import { HTTP_STATUS, envs } from '../config/constants'
import { ITokenPayload } from '../interfaces/token.interface'
import { Request, Response, NextFunction } from 'express'
import HttpError from './HttpError.utils'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = envs;

export default class SessionUtils {
  static async generateToken(payload: ITokenPayload): Promise<string> {
    const token: string = sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }) // FIXME: change to 10 minutes?
    return token
  }

  static async generateRefreshToken(payload: ITokenPayload): Promise<string> {
    const refreshToken: string = sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '2h' })
    return refreshToken;
  }

  static async verifyToken(
    token: string,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err) // FIXME: Replace with a Morgan
        const response: HttpError = new HttpError(err.message, err.message)
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(response)
      }

      req.user = user as ITokenPayload
      return next()
    })
  }

  static async verifyRefreshToken(token: string): Promise<ITokenPayload> {
    verify(token, REFRESH_TOKEN_SECRET);
    const decoded = decode(token);
    return decoded as ITokenPayload;
  }
}
