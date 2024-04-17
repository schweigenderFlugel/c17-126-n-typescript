import { SequelizeStorage, Umzug } from "umzug";
import { sequelize } from "../../src/models/db/database.manager";

const umzug = new Umzug({
  migrations: { glob: './src/models/db/seeders/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

export const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();
  } catch (error) {
    console.error(error);
  }
}

export const downSeed = async () => {
  await sequelize.drop();
}