import { DataTypes } from 'sequelize'
import { sequelize } from '../database.manager'

const { STRING, INTEGER } = DataTypes

const User = sequelize.define('users', {
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
