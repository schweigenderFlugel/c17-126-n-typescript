import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.manager";
import { IAnualHistorial } from "../../../interfaces/anualHistorial.interface";
import { BankAccount } from "./bank-account.entity";
import { Historial } from "./historial.entity";

export interface AnualHistorialModel extends Model<IAnualHistorial>, IAnualHistorial {}

export const AnualHistorial = sequelize.define<AnualHistorialModel>('anual-historial', {
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
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jan: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  feb: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  mar: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  apr: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  may: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  jun: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  jul: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  aug: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  sep: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  oct: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  nov: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  dec: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Historial.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
},
{
  timestamps: false,
}
) 