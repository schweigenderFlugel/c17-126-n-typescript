import { Model } from 'sequelize'
import { IAuth } from '../../interfaces/auth.interfaces'
import { Auth, User } from '../db'

export default class authDao {
  private static intance: authDao | null = null

  private constructor() {}

  static getInstance(): authDao {
    if (!this.intance) {
      this.intance = new authDao()
    }
    return this.intance
  }

  /**
   * Create an authentication record.
   *
   * @param {IAuth} authPayload - the authentication payload to create
   * @return {Promise<any>} the created authentication record
   */
  async createAuth(authPayload: IAuth): Promise<Model<IAuth>> {
    const authCreated: Model<IAuth> = await Auth.create(
      authPayload as Omit<IAuth, 'id'>
    )
    return authCreated
  }

  /**
   * Retrieve authentication information by ID.
   *
   * @param {string} id - The ID of the authentication information to retrieve.
   * @return {Promise<Model<IAuth> | null>} The retrieved authentication information, or null if not found.
   */
  async getAuthById(id: string): Promise<Model<IAuth> | null> {
    const authFound: Model<IAuth> | null = await Auth.findByPk(id)
    return authFound
  }

  /**
   * Retrieve all auth data.
   *
   * @return {Promise<Model<IAuth>[]>} List of auth data
   */
  async getAllAuth(): Promise<Model<IAuth>[]> {
    const authsFound: Model<IAuth>[] = await Auth.findAll()
    return authsFound
  }

  /**
   * Get authentication information by username.
   *
   * @param {string} userName - The username to search for
   * @return {Promise<Model<IAuth> | null>} The authentication information found, or null if not found
   */
  async getAuthByUserName(userName: string): Promise<Model<IAuth> | null> {
    const authFound: Model<IAuth> | null = await Auth.findOne({
      where: {
        username: userName,
      },
    })
    return authFound
  }

  /**
   * A function that updates authentication information.
   *
   * @param {string} id - the ID of the authentication information to update
   * @param {IAuth} authPayload - the new authentication payload
   * @return {Promise<Model<IAuth> | null>} the updated authentication model or null if not found
   */
  async updateAuth(
    id: string,
    authPayload: IAuth
  ): Promise<Model<IAuth> | null> {
    const authUpdated = await Auth.update(authPayload, {
      where: { id },
      returning: true,
    })
    return authUpdated[1][0]
  }

  /**
   * A function that deletes an authentication record.
   *
   * @param {string} id - The ID of the authentication record to delete
   * @return {Promise<Model<IAuth> | null>} The deleted authentication record or null if not found
   */
  async deleteAuth(id: string): Promise<Model<IAuth> | null> {
    const authDeleted = await Auth.update(
      { status: 'false' },
      {
        where: { id },
      }
    )
    if (!authDeleted) return authDeleted[1][0]

    return null
  }
}
