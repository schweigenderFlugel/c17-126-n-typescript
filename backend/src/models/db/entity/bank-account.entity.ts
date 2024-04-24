import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database.manager'
import { IBankAccount } from '../../../interfaces/bankAccount.interface'
import { User } from './user.entity'

export interface BankAccountModel extends Model<IBankAccount>, IBankAccount {}

const BankAccount = sequelize.define<BankAccountModel>(
  'bank_account',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      unique: true,
      references: {
        model: User.getTableName(),
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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
    expenses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },
  { timestamps: false }
)

export { BankAccount }
