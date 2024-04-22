import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database.manager' 
import { IBankAccount } from '../../../interfaces/bankAccount.interface'
import { User } from './user.entity'

export interface BankAccountModel extends Model<IBankAccount>, IBankAccount {}

const BankAccount = sequelize.define<BankAccountModel>('bank_account', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  number_account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, { timestamps: false })

export { BankAccount }
