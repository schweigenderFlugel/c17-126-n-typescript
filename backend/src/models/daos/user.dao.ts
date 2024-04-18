import { Model } from 'sequelize'
import { User } from '../db'
import { IUser } from '../../interfaces/user.interface'

export default class userDao {
  private static instance: userDao | null = null

  private constructor() {}

  static getInstance(): userDao {
    if (!this.instance) {
      this.instance = new userDao()
    }

    return this.instance
  }

  /**
   * Create a new user with the given user payload.
   *
   * @param {IUser} userPayload - the payload for creating a new user
   * @return {Promise<any>} a promise that resolves to the created user
   */
  async createUser(userPayload: IUser): Promise<Model<IUser>> {
    const userCreated = await User.create(userPayload as Omit<IUser, 'id'>)
    return userCreated
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} id - The ID of the user to retrieve.
   * @return {Promise<Model<IUser> | null>} The user model if found, otherwise null.
   */
  async getUserById(id: number): Promise<Model<IUser> | null> {
    const userFound: Model<IUser> | null = await User.findByPk(id)
    return userFound
  }

  /**
   * Retrieves all users from the database.
   *
   * @return {Promise<Model<IUser>[]>} An array of user models
   */
  async getAllUsers(): Promise<Model<IUser>[]> {
    const usersFound: Model<IUser>[] = await User.findAll()
    return usersFound
  }

  /**
   * Asynchronously retrieves a user by their email.
   *
   * @param {string} alias - the email of the user to retrieve
   * @return {Promise<Model<IUser> | null>} the user model if found, or null if not found
   */
  async getUserByAlias(alias: string): Promise<Model<IUser> | null> {
    const userFound: Model<IUser> | null = await User.findOne({
      where: {
        alias: alias,
      },
    })
    return userFound
  }

  /**
   * Retrieves a user by their authentication ID.
   *
   * @param {number} authId - The authentication ID of the user to retrieve.
   * @return {Promise<Model<IUser> | null>} The user model if found, otherwise null.
   */
  async getUserByAuthId(authId: number): Promise<Model<IUser> | null> {
    const userFound: Model<IUser> | null = await User.findOne({
      where: {
        authId: authId,
      },
    })
    return userFound
  }

  /**
   * Updates a user in the database.
   *
   * @param {number} id - The ID of the user to update
   * @param {IUser} userPayload - The payload containing the user information to update
   * @return {Promise<Model<IUser> | null>} The updated user model or null if not found
   */
  async updateUser(
    id: number,
    userPayload: IUser
  ): Promise<Model<IUser> | null> {
    const userUpdated = await User.update(userPayload, {
      where: { id },
      returning: true,
    })
    return userUpdated[1][0]
  }

  /**
   * Delete a user by their ID.
   *
   * @param {number} id - The ID of the user to be deleted
   * @return {Promise<number>} The number of users deleted
   */
  async deleteUser(id: number): Promise<number> {
    const userDeleted = await User.destroy({
      where: { id },
    })
    return userDeleted
  }
}
