import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../postgres.manager'
import { ITypeAccount } from '../../../interfaces/type-account.interface'

export interface TypeAccountModel extends Model<ITypeAccount>, ITypeAccount {}

const TypeAccount = sequelize.define<TypeAccountModel>('TypeAccount', {
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
