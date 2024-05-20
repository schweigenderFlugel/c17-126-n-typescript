import { IAuth, ISign } from '../interfaces/auth.interface'
import authDao from '../models/daos/auth.dao'

export default class authService {
  /**
   * A description of the entire function.
   *
   * @param {ISign} authPayload - description of parameter
   * @return {Promise<IAuth>} description of return value
   */
  static async createAuth(authPayload: ISign): Promise<IAuth> {
    const authCreated = await authDao.getInstance().createAuth(authPayload)
    return authCreated;
  }

  /**
   * A description of the entire function.
   *
   * @param {IAuth['id']} id - description of parameter
   * @return {Promise<IAuth>} description of return value
   */
  static async getAuthById(id: IAuth['id']): Promise<IAuth> {
    const authFound = await authDao.getInstance().getAuthById(id)
    return authFound as IAuth
  }

  /**
   * Retrieve all authentication records.
   *
   * @return {Promise<IAuth[]>} Found authentication records
   */
  static async getAllAuth(): Promise<IAuth[]> {
    const authsFound = await authDao.getInstance().getAllAuth()
    return authsFound
  }

  /**
   * A description of the entire function.
   *
   * @param {string} email - description of parameter
   * @return {Promise<IAuth>} description of return value
   */
  static async getAuthByEmail(
    email: string
  ): Promise<IAuth> {
    const authFound = await authDao.getInstance().getAuthByEmail(email)
    return authFound as IAuth;
  }

  /**
   * Update authentication information.
   *
   * @param {IAuth['id']} id - The ID of the authentication information.
   * @param {Partial<IAuth>} authPayload - The updated authentication payload.
   * @return {Promise<IAuth>} The updated authentication information or null if not found.
   */
  static async updateAuth(
    id: IAuth['id'],
    authPayload: Partial<IAuth>
  ): Promise<IAuth> {
    const authUpdated = await authDao.getInstance().updateAuth(id, authPayload)
    return authUpdated as IAuth;
  }

  /**
   * Delete authentication by ID.
   *
   * @param {IAuth['id']} id - The ID of the authentication to delete.
   * @return {Promise<IAuth | null>} The deleted authentication if successful, otherwise null.
   */
  static async deleteAuth(id: IAuth['id']): Promise<IAuth> {
    const authDeleted = await authDao.getInstance().deleteAuth(id)
    return authDeleted as IAuth
  }
}
