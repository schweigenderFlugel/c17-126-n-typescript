import { DATE, INTEGER, Model, NOW, STRING } from "sequelize";
import { ISession } from "../../../interfaces/session.interface";
import { sequelize } from "../database.manager";
import { Auth } from "./auth.entity";

export interface SessionModel extends Model<ISession>, ISession {}

export const Session = sequelize.define<SessionModel>('session', {
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true
  },
  authId: {
    type: INTEGER,
    field: 'auth_id',
    allowNull: false,
    references: {
      model: Auth.getTableName(),
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  refreshToken: {
    type: STRING,
    field: 'refresh_token',
    allowNull: true,
  },
  lastEntry: {
    type: DATE,
    field: 'last_entry',
    allowNull: true, 
    defaultValue: NOW,
  },
},
{
  timestamps: false
}
)