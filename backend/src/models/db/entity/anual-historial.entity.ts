import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.manager";
import { IAnualHistorial } from "../../../interfaces/anualHistorial.interface";
import { BankAccount } from "./bank-account.entity";

export interface AnualHistorialModel extends Model<IAnualHistorial>, IAnualHistorial {}

export const AnualHistorial = sequelize.define<AnualHistorialModel>('anual-historial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bank_account: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: BankAccount.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  timestamps: false,
}
) 