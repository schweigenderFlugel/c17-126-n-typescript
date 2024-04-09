import { Model } from 'sequelize'
import userDao from '../models/daos/user.dao'
import { IUser } from '../interfaces/user.interface'

export default class userService {
  /**
   * Creates a new user with the given user payload.
   *
   * @param {IUser} userPayload - the payload for creating the user
   * @return {Promise<Model<IUser> | null>} the created user model, or null if creation fails
   */
  static async createUser(userPayload: IUser): Promise<Model<IUser> | null> {
    const user = await userDao.getInstance().createUser(userPayload)
    return user
  }
}
