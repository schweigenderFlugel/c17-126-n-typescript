import { DATE, INTEGER, Model, NOW, STRING } from "sequelize";
import { ISession } from "../../../interfaces/session.interface";
import { sequelize } from "../database.manager";
import { Auth } from "./auth.entity";

export interface SessionModel extends Model<ISession>, ISession {}

export const Session = sequelize.define<SessionModel>('session', {
  id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
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
  userAgent: {
    type: STRING,
    field: 'user_agent',
    allowNull: true,
    defaultValue: null,
  },
  refreshToken: {
    type: STRING,
    field: 'refresh_token',
    allowNull: true,
    defaultValue: null
  },
  lastEntry: {
    type: DATE,
    field: 'last_entry',
    allowNull: true, 
    defaultValue: null,
  },
},
{
  timestamps: false
}
)