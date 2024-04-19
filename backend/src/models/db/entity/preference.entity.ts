import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database.manager'
import { IPreferences } from '../../../interfaces/preference.interface'

export interface PreferencesModel extends Model<IPreferences>, IPreferences {}

const Preferences = sequelize.define<PreferencesModel>('Preferences', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  max_ammount_transfers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 999999,
  },
})

export { Preferences }
