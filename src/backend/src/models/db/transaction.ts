import { sequelize, DataTypes, Model } from '../../config/db.config';
const { STRING, INTEGER, ENUM, NUMBER } = DataTypes;

// To modularize
class Transaction extends Model {
  // Transaction functionalities here
}

Transaction.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_sender_id: {
      type: STRING,
      allowNull: false,
    },
    user_reciver_id: {
      type: STRING,
      allowNull: false,
    },
    amount: {
      type: NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'Transactions',
    createdAt: true
  }
);

export { Transaction };
