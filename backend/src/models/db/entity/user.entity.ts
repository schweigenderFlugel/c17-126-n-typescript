import { DataTypes, Model } from 'sequelize'
import { IUser } from '../../../interfaces/user.interface'
import { sequelize } from '../database.manager'

const { STRING, INTEGER } = DataTypes;

export interface UserModel extends Model<IUser>, IUser {}

const User = sequelize.define<UserModel>('users', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  lastname: {
    type: STRING,
    allowNull: false,
  },
  alias: {
    type: STRING,
    allowNull: false,
  },
  address: {
    type: STRING,
    allowNull: false,
  },
  phone: {
    type: STRING,
    allowNull: false,
  },
  authId: {
    type: INTEGER,
    allowNull: false,
  },
})

export { User }
