// HERE WILL BE THE DATABASE CONNECTION
import { Sequelize, Options } from 'sequelize';
import { envs } from '../../config/constants';
import { ENVIROMENTS } from '../../../enviroments';


export const sequelize = envs.NODE_ENV === ENVIROMENTS.PRODUCTION
  ? new Sequelize(envs.DB_URL, {
      logging: false,
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: `data/tests/test.${Math.random()}.sqlite`,
      logging: false,
    })

