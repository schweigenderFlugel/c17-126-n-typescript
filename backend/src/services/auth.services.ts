import { Model } from 'sequelize'
import { IAuth } from '../interfaces/auth.interface'
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

  /**
   * A description of the entire function.
   *
   * @param {number} id - description of parameter
   * @return {Promise<Model<IAuth> | null>} description of return value
   */
  static async getAuthById(id: number): Promise<Model<IAuth> | null> {
    const authFound = await authDao.getInstance().getAuthById(id)
    return authFound
  }

  /**
   * Retrieve all authentication records.
   *
   * @return {Promise<Model<IAuth>[]>} Found authentication records
   */
  static async getAllAuth(): Promise<Model<IAuth>[]> {
    const authsFound = await authDao.getInstance().getAllAuth()
    return authsFound
  }

  /**
   * A description of the entire function.
   *
   * @param {string} email - description of parameter
   * @return {Promise<IAuth | null>} description of return value
   */
  static async getAuthByEmail(
    email: string
  ): Promise<IAuth | null> {
    const authFound = await authDao.getInstance().getAuthByEmail(email)
    return authFound
  }

  /**
   * Update authentication information.
   *
   * @param {number} id - The ID of the authentication information.
   * @param {IAuth} authPayload - The updated authentication payload.
   * @return {Promise<Model<IAuth> | null>} The updated authentication information or null if not found.
   */
  static async updateAuth(
    id: number,
    authPayload: IAuth
  ): Promise<Model<IAuth> | null> {
    const authUpdated = await authDao.getInstance().updateAuth(id, authPayload)
    return authUpdated
  }

  /**
   * Delete authentication by ID.
   *
   * @param {number} id - The ID of the authentication to delete.
   * @return {Promise<Model<IAuth> | null>} The deleted authentication if successful, otherwise null.
   */
  static async deleteAuth(id: number): Promise<Model<IAuth> | null> {
    const authDeleted = await authDao.getInstance().deleteAuth(id)
    return authDeleted
  }
}
