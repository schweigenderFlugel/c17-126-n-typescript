import { IAuth } from '../interfaces/auth.interfaces'
import authDao from '../models/daos/auth.dao'

export default class authService {
  static async createAuth(): Promise<any> {
    const authCreated = await authDao.getInstance().createAuth({
      username: 'pepeUser',
      password: 'pepePassword',
    })
    return authCreated
  }
}
