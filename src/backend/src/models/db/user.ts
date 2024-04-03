import { sequelize, DataTypes, Model } from '../../config/db.config';
const { STRING, INTEGER, ENUM } = DataTypes;

// To modularize
class User extends Model {
  // user functionalities here
}

User.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: ENUM('User', 'Enterprise', 'Admin'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  }
);

export { User };
