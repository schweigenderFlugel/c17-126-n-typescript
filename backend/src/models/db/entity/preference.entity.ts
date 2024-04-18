import { DataTypes } from 'sequelize'
import { sequelize } from '../database.manager'

const Preferences = sequelize.define('Preferences', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  max_ammount_transfers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

export { Preferences }
