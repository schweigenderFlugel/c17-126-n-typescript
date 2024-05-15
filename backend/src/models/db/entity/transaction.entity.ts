import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database.manager'
import { TRANSACTION_STATUS, TYPETRANSFERS } from '../../../config/constants'
import { ITransaction } from '../../../interfaces/transaction.interface'
import { BankAccount } from './bank-account.entity'
import { Historial } from './historial.entity'

const { INTEGER, ENUM } = DataTypes

export interface TransactionModel extends Model<ITransaction>, ITransaction {}

const Transaction = sequelize.define<TransactionModel>('transaction', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  historial_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  operation_number: {
    type: INTEGER,
    allowNull: false
  },
  source_account: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: BankAccount.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  destination_account: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: BankAccount.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
    allowNull: false,
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
  timestamps: false,
})

export { Transaction }
