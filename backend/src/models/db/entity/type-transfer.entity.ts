import { DataTypes, ENUM, Model } from 'sequelize'
import { sequelize } from '../database.manager'
import { ITypeTransfers } from '../../../interfaces/typeTransfers.interface'
import { TYPETRANSFERS } from '../../../config/constants'

export interface TypeTransfersModel
  extends Model<ITypeTransfers>,
    ITypeTransfers {}

const TypeTransfers = sequelize.define<TypeTransfersModel>('TypeTransfert', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: ENUM,
    values: Object.values(TYPETRANSFERS),
    defaultValue: 'deferred',
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
})

export { TypeTransfers }
