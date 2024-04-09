import { Model } from 'sequelize'
import { IAuth } from '../interfaces/auth.interfaces'
import authDao from '../models/daos/auth.dao'

export default class authService {
  /**
   * A description of the entire function.
   *
   * @param {IAuth} authPayload - description of parameter
   * @return {Promise<Model<IAuth> | null>} description of return value
   */
  static async createAuth(authPayload: IAuth): Promise<Model<IAuth> | null> {
    const authCreated = await authDao.getInstance().createAuth(authPayload)
    return authCreated
  }
}
