import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database.manager'
import { TRANSACTION_STATUS } from '../../../config/constants'
import { ITransaction } from '../../../interfaces/transtations.interface'

const { STRING, INTEGER, ENUM, NUMBER } = DataTypes

export interface TransactionModel extends Model<ITransaction>, ITransaction {}

const Transaction = sequelize.define<TransactionModel>('Transaction', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  source_account: {
    type: INTEGER,
    allowNull: false,
  },
  destination_account: {
    type: INTEGER,
    allowNull: false,
  },
  type_transfer_id: {
    type: INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date_transaction: {
    type: DataTypes.DATE,
  },
  status: {
    type: ENUM,
    values: Object.values(TRANSACTION_STATUS),
    defaultValue: 'pending',
    allowNull: false,
  },
})

export { Transaction }
