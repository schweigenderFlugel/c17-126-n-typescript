import { DataTypes } from 'sequelize'
import { sequelize } from '../database.manager'

const TypeTransfert = sequelize.define('TypeTransfert', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export { TypeTransfert }
