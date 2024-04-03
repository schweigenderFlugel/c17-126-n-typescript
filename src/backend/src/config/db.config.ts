// HERE WILL BE THE DATABASE CONFIGURATION
import { Sequelize, DataTypes, Model } from 'sequelize';
import { DATABASE, HOST, PASSWORD, USER } from './constants';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: HOST,
  username: USER,
  password: PASSWORD,
  database: DATABASE,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

export { sequelize, DataTypes, Model };


