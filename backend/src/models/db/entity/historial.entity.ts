import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.manager";
import { BankAccount } from "./bank-account.entity";
import { IHistorial } from "../../../interfaces/historial.interface";

export interface HistorialModel extends Model<IHistorial>, IHistorial {}

export const Historial = sequelize.define<HistorialModel>('monthly-historial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bank_account: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: BankAccount.getTableName(),
        key: 'id',
      },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expenses: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  investments: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  timestamps: false,
}
) 