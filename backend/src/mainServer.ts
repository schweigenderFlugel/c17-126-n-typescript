import './models/db/postgres.manager'
import { sequelize } from './models/db/postgres.manager'
import createExpressApp from './config/createApp'
import middlewaresConfig from './config/middlewares.config'

// Import Entities for Sequelize
import './models/db'
import RegisterRoutes from './utils/register.routes'

// CREATE EXPRESS APP
async function main() {
  const app = createExpressApp()

  // Conection to DB
  await sequelize.sync({ force: true })

  // SETUP GLOBAL MIDDLEWARES
  middlewaresConfig.config(app)

  /**
   * * Load of Routes for V1
   */
  await RegisterRoutes(app, 'v1')

  /**
   * * Loading of routes for new functions in V2
   */
  await RegisterRoutes(app, 'v2')
}

main()
