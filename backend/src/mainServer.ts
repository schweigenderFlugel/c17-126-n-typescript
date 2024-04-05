import './models/db/postgres.manager'
import { sequelize } from './models/db/postgres.manager'
import apiRouter from './routers/api.router'
import createExpressApp from './config/createApp'
import middlewaresConfig from './config/middlewares.config'

// Import Entities for Sequelize
import './models/db'

// CREATE EXPRESS APP
async function main() {
  const app = createExpressApp()

  // Conection to DB
  await sequelize.sync({ force: true })

  // SETUP GLOBAL MIDDLEWARES
  middlewaresConfig.config(app)

  app.use('/api/v1', apiRouter) //
}

main()
