import { DataTypes } from 'sequelize'
import { sequelize } from '../postgres.manager'

const { STRING, INTEGER, ENUM, NUMBER } = DataTypes

enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const Transaction = sequelize.define('Transaction', {
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
    values: Object.values(TransactionStatus),
    defaultValue: 'pending',
    allowNull: false,
  },
})

export { Transaction }
