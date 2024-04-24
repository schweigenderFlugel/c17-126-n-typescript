import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database.manager'
import { TRANSACTION_STATUS, TYPETRANSFERS } from '../../../config/constants'
import { ITransaction } from '../../../interfaces/transaction.interface'

const { INTEGER, ENUM } = DataTypes

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
  type_transfer: {
    type: ENUM,
    values: Object.values(TYPETRANSFERS),
    defaultValue: 'deferred',
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
}, 
{ 
  timestamps: false 
})

export { Transaction }
