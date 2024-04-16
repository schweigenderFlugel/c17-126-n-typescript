import { decode, sign, verify } from 'jsonwebtoken'
import { envs } from '../config/constants'
import { ITokenPayload } from '../interfaces/token.interface'

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

  static async verifyRefreshToken(token: string): Promise<ITokenPayload> {
    verify(token, REFRESH_TOKEN_SECRET);
    const decoded = decode(token);
    return decoded as ITokenPayload;
  }
}
