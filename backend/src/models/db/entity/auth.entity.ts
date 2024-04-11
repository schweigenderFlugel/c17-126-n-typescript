import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../postgres.manager'
import { IAuth } from '../../../interfaces/auth.interface'

export enum Roles {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

export interface AuthModel extends Model<IAuth>, IAuth {}

export const Auth = sequelize.define<AuthModel>('auth', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: Roles.NORMAL,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}
)
