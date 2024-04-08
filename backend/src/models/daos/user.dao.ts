import { IUser } from '../../interfaces/user.interface'
import { User } from '../db'

export default class userDao {
  private static intance: userDao | null = null

  private constructor() {}

  static getInstance(): userDao {
    if (!this.intance) {
      this.intance = new userDao()
    }

    return this.intance
  }

  async createUser(userPayload: IUser): Promise<any> {
    const userCreated = await User.create(userPayload as Omit<IUser, 'id'>)
    return userCreated
  }
}
