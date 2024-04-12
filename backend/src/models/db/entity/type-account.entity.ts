import { DataTypes } from 'sequelize'
import { sequelize } from '../database.manager'

const TypeAccount = sequelize.define('TypeAccount', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export { TypeAccount }
