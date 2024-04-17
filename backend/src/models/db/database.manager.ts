// HERE WILL BE THE DATABASE CONNECTION
import { Sequelize } from 'sequelize';
import { envs } from '../../config/constants';
import { ENVIROMENTS } from '../../../enviroments';

let sequelize: Sequelize;

if (envs.NODE_ENV === ENVIROMENTS.PRODUCTION) {
  sequelize = new Sequelize(envs.DB_URL, {
    logging: false,
  })
} else if (envs.NODE_ENV === ENVIROMENTS.DEVELOPMENT) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `devdb.sqlite`,
    logging: false,
  })
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `data/tests/test.${Math.random()}.sqlite`,
    logging: false,
  })
}
  
export { sequelize };

