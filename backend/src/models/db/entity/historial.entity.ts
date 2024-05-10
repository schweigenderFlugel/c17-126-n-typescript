import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.manager";
import { IHistorial } from "../../../interfaces/historial.interface";
import { AnualHistorial } from "./anual-historial.entity";

export interface HistorialModel extends Model<IHistorial>, IHistorial {}

export const Historial = sequelize.define<HistorialModel>('historial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  anual_historial_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AnualHistorial.getTableName(),
      key: 'id'
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