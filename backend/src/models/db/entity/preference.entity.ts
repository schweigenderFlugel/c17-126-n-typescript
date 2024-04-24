import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database.manager'
import { IPreferences } from '../../../interfaces/preference.interface'
import { User } from './user.entity'

export interface PreferencesModel extends Model<IPreferences>, IPreferences {}

const Preferences = sequelize.define<PreferencesModel>('preferences', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
    unique: true,
    references: {
      model: User.getTableName(),
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  min_ammount_transfers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 999999,
  },
  max_ammount_transfers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 999999,
  },
},
{
  timestamps: false,
}
)

export { Preferences }
