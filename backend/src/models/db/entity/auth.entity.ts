import { DataTypes, Model, NOW } from 'sequelize'
import { sequelize } from '../database.manager'
import { IAuth } from '../../../interfaces/auth.interface'

export enum Roles {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

export interface AuthModel extends Model<IAuth>, IAuth {}

export const Auth = sequelize.define<AuthModel>('auth', {
  id: {
    type: DataTypes.STRING,
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
  activationCode: {
    field: 'activation_code',
    type: DataTypes.STRING,
    allowNull: true,
  },
  attempts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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