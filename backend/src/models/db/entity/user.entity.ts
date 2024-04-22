import { DataTypes, Model, NOW } from 'sequelize'
import { IUser } from '../../../interfaces/user.interface'
import { sequelize } from '../database.manager'
import { Auth } from './auth.entity';

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
  accountType: {
    field: 'account_type',
    type: DataTypes.STRING,
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
    field: 'auth_id',
    allowNull: false,
    unique: true,
    references: {
      model: Auth.getTableName(),
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: NOW,
    allowNull: false,
  }
})

export { User }
