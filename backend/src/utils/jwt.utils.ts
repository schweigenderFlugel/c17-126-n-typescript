import { decode, sign, verify } from 'jsonwebtoken'
import { HTTP_STATUS, envs } from '../config/constants'
import { ITokenPayload } from '../interfaces/token.interface'
import { Request, Response, NextFunction } from 'express'
import HttpError from './HttpError.utils'
import { ENVIROMENTS } from '../../enviroments'

const { NODE_ENV, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = envs;

const accessSecret = NODE_ENV === ENVIROMENTS.PRODUCTION
  ? ACCESS_TOKEN_SECRET
  : 'bankme';

const refreshSecret = NODE_ENV === ENVIROMENTS.PRODUCTION
  ? REFRESH_TOKEN_SECRET
  : 'bankme';

const recoverySecret = NODE_ENV === ENVIROMENTS.PRODUCTION
  ? REFRESH_TOKEN_SECRET
  : 'bankme';


export default class JwtUtils {
  static async generateToken(payload: ITokenPayload): Promise<string> {
    const token: string = sign(payload, accessSecret, { expiresIn: '10m' })
    return token
  }

  static async generateRefreshToken(payload: ITokenPayload): Promise<string> {
    const refreshToken: string = sign(payload, refreshSecret, { expiresIn: '2h' })
    return refreshToken;
  }

  static async generateRecoveryToken(payload: Omit<ITokenPayload, 'role'>): Promise<string> {
    const recoveryToken: string = sign(payload, refreshSecret, { expiresIn: '15m' })
    return recoveryToken;
  }

  static async verifyToken(
    token: string,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    verify(token, accessSecret, (err, user) => {
      if (err) {
        // console.log(err) // FIXME: Replace with a Morgan
        const response: HttpError = new HttpError(err.message, err.message)
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(response)
      }

      req.user = user as ITokenPayload
      return next()
    })
  }

  static async verifyRefreshToken(token: string): Promise<ITokenPayload> {
    verify(token, refreshSecret);
    const decoded = decode(token);
    return decoded as ITokenPayload;
  }
}
