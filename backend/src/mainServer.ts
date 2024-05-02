import './models/db/database.manager'
import { sequelize } from './models/db/database.manager'
import createExpressApp from './config/createApp'

// Import Entities for Sequelize
import './models/db'
import { envs } from './config/constants'

// CREATE EXPRESS APP
async function main() {
  const app = createExpressApp()

  // Conection to DB
  await sequelize.sync({ alter: true })

  app.listen(envs.PORT, () => {
    console.log(
      `Servidor de express escuchando puerto ${envs.PORT} - PID WORKER ${process.pid}`
    )
  })
}

main()
