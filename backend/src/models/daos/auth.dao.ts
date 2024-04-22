import { IAuth, ISign } from '../../interfaces/auth.interface'
import { Auth, AuthModel } from '../db'

export default class authDao {
  private static instance: authDao | null = null

  private constructor() {}

  static getInstance(): authDao {
    if (!this.instance) {
      this.instance = new authDao()
    }
    return this.instance
  }

  /**
   * Create an authentication record.
   *
   * @param {IAuth} authPayload - the authentication payload to create
   * @return {Promise<any>} the created authentication record
   */
  async createAuth(authPayload: ISign): Promise<AuthModel> {
    const authCreated: AuthModel = await Auth.create(authPayload as IAuth)
    return authCreated;
  }

  /**
   * Retrieve authentication information by ID.
   *
   * @param {string} id - The ID of the authentication information to retrieve.
   * @return {Promise<AuthModel | null>} The retrieved authentication information, or null if not found.
   */
  async getAuthById(id: number): Promise<AuthModel | null> {
    const authFound: AuthModel | null = await Auth.findByPk(id)
    return authFound
  }

  /**
   * Retrieve all auth data.
   *
   * @return {Promise<AuthModel[]>} List of auth data
   */
  async getAllAuth(): Promise<AuthModel[]> {
    const authsFound: AuthModel[] = await Auth.findAll()
    return authsFound
  }

  /**
   * Get authentication information by email.
   *
   * @param {string} email - The email to search for
   * @return {Promise<IAuth | null>} The authentication information found, or null if not found
   */
  async getAuthByEmail(email: string): Promise<AuthModel | null> {
    const authFound = await Auth.findOne({
      where: {
        email: email,
      },
    })
    return authFound
  }

  /**
   * A function that updates authentication information.
   *
   * @param {string} id - the ID of the authentication information to update
   * @param {IAuth} authPayload - the new authentication payload
   * @return {Promise<AuthModel | null>} the updated authentication model or null if not found
   */
  async updateAuth(id: number, authPayload: IAuth): Promise<AuthModel | null> {
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
   * @return {Promise<AuthModel | null>} The deleted authentication record or null if not found
   */
  async deleteAuth(id: number): Promise<AuthModel | null> {
    const authDeleted = await Auth.update(
      { status: false },
      {
        where: { id },
      }
    )
    if (!authDeleted) return authDeleted[1][0]

    return null
  }
}
