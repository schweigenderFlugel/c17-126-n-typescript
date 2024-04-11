import { sign } from 'jsonwebtoken'
import { envs } from '../config/constants'
import { ITokenPayload } from '../interfaces/token.interface'

const { SECRET_KEY } = envs

export default class SessionUtils {
  static async generateToken(payload: ITokenPayload): Promise<string> {
    const token: string = sign(payload, SECRET_KEY, { expiresIn: '24h' }) // FIXME: change to 10 minutes?
    return token
  }
}
