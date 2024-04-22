import { Model } from 'sequelize'
import userDao from '../models/daos/user.dao'
import { ICreateUser, IUser } from '../interfaces/user.interface'

export default class userService {
  /**
   * Creates a new user with the given user payload.
   *
   * @param {IUser} userPayload - the payload for creating the user
   * @return {Promise<Model<IUser> | null>} the created user model, or null if creation fails
   */
  static async createUser(userPayload: ICreateUser): Promise<Model<IUser> | null> {
    const userCreated = await userDao.getInstance().createUser(userPayload)
    return userCreated
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} id - The ID of the user to retrieve
   * @return {Promise<Model<IUser> | null>} The user found, or null if not found
   */
  static async getUserById(id: number): Promise<Model<IUser> | null> {
    const userFound = await userDao.getInstance().getUserById(id)
    return userFound
  }

  /**
   * Retrieve all users from the database.
   *
   * @return {Promise<Model<IUser>[]>} Array of user models
   */
  static async getAllUsers(): Promise<Model<IUser>[]> {
    const usersFound = await userDao.getInstance().getAllUsers()
    return usersFound
  }

  /**
   * Get a user by their email address.
   *
   * @param {string} alias - the alias address of the user
   * @return {Promise<Model<IUser> | null>} the user found or null if not found
   */
  static async getUserByAlias(alias: string): Promise<Model<IUser> | null> {
    const userFound = await userDao.getInstance().getUserByAlias(alias)
    return userFound
  }

  /**
   * Retrieves a user by their authentication ID.
   *
   * @param {number} authId - The authentication ID of the user to retrieve.
   * @return {Promise<Model<IUser> | null>} The user model if found, otherwise null.
   */
  static async getUserByAuthId(authId: number): Promise<IUser> {
    const userFound = await userDao.getInstance().getUserByAuthId(authId)
    return userFound as IUser;
  }

  /**
   * Update a user by their ID with the provided user payload.
   *
   * @param {number} id - The ID of the user to update
   * @param {IUser} userPayload - The payload containing the updated user information
   * @return {Promise<Model<IUser> | null>} A Promise resolving to the updated user model or null if the user was not found
   */
  static async updateUser(
    id: number,
    userPayload: IUser
  ): Promise<Model<IUser> | null> {
    const userUpdated = await userDao.getInstance().updateUser(id, userPayload)
    return userUpdated
  }

  /**
   * A description of the entire function.
   *
   * @param {number} id - description of parameter
   * @return {Promise<number>} description of return value
   */
  static async deleteUser(id: number): Promise<number> {
    const qtyDeleted = await userDao.getInstance().deleteUser(id)
    return qtyDeleted
  }
}
