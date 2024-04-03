// HERE WILL BE THE DATABASE CONNECTION
import { sequelize } from '../../config/db.config';

(async () => {
  await sequelize.sync({ force: true }); // alter/force
  console.log('All models were synchronized successfully.');
})();
