import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../postgres.manager'
import { IAuth } from '../../../interfaces/auth.interface'

interface AuthInstance extends Model<IAuth>, IAuth {}

const Auth = sequelize.define<AuthInstance>('Auth', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

export { Auth }
