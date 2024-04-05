// HERE WILL BE THE DATABASE CONNECTION
import { Sequelize } from 'sequelize'
import { envs } from '../../config/constants'

export const sequelize = new Sequelize(envs.DB_URL, {
  logging: false,
})
