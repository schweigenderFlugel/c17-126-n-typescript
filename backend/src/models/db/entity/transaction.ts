import { DataTypes } from 'sequelize'
import { sequelize } from '../database.manager'

const { INTEGER, ENUM } = DataTypes

enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const Transaction = sequelize.define('transactions', {
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
