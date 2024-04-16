import { DataTypes, Model, ModelOptions } from 'sequelize'
import { sequelize } from '../database.manager'
import { IAuth } from '../../../interfaces/auth.interface'

export enum Roles {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

export const AUTH_TABLE = 'auth';

const options: ModelOptions = {
  tableName: AUTH_TABLE,
  timestamps: false,
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }, 
}, options
)