import { sign } from 'jsonwebtoken'
import { envs } from '../config/constants'
import { ITokenPayload } from '../interfaces/token.interface'

const { ACCESS_TOKEN_SECRET } = envs

export default class SessionUtils {
  static async generateToken(payload: ITokenPayload): Promise<string> {
    const token: string = sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '24h' }) // FIXME: change to 10 minutes?
    return token
  }
}
