import userDao from '../models/daos/user.dao'

export default class userService {
  static async createUser(): Promise<void> {
    const user = await userDao.getInstance().createUser({
      name: 'test',
      lastname: 'test',
      address: 'test',
      email: 'test',
      phone: 'test',
      authId: 1,
    })
    return user
  }
}
