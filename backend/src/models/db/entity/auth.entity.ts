import { DataTypes, Model, ModelOptions, NOW, Sequelize } from 'sequelize'
import { sequelize } from '../database.manager'
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
    unique: true,
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
    field: 'refresh_token',
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }, 
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: NOW,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    defaultValue: NOW,
  }
}, 
)