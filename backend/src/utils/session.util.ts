import { sign } from 'jsonwebtoken'
import { envs } from '../config/constants'

const { SECRET_KEY } = envs

export default class SessionUtils {
  static generateToken(user: object): string {
    const token: string = sign(user, SECRET_KEY, { expiresIn: '24h' }) // FIXME: change to 10 minutes?
    return token
  }
}
