import express from 'express'
import cluster from 'cluster'
import { cpus } from 'os'
import { envs } from './constants'
import morgan from 'morgan'
import passport from 'passport'
import { JwtStrategy } from '../strategies/jwt-strategy'
import '../models/db/database.manager'
import '../models/db'
import { sequelize } from '../models/db/database.manager'
import middlewaresConfig from './middlewares.config'
import RegisterRoutes from '../utils/register.routes'

export default function createExpressApp() {
  const app = express()

  if (envs.CLUSTER && cluster.isPrimary) {
    const numCPUS = cpus().length
    console.log(`CPUs Quantity: ${numCPUS}`)
    console.log(`PID MASTER: ${process.pid}`)
    // eslint-disable-next-line no-plusplus
    for (let i: number = 0; i < numCPUS; i++) {
      cluster.fork()
    }

    cluster.on('exit', worker => {
      console.log(
        'Worker',
        worker.process.pid,
        'died',
        new Date().toLocaleString()
      )
      cluster.fork()
    })
  } else {
    envs.NODE_ENV !== 'prod' && app.use(morgan('dev'))

    // app.listen(envs.PORT, () => {
    // console.log(
    //    `Servidor de express escuchando puerto ${envs.PORT} - PID WORKER ${process.pid}`
    //  )
    // })
  }

  /**
   * * Load of Routes for V1
   */
  RegisterRoutes(app, 'v1')

  // SETUP GLOBAL MIDDLEWARES
  middlewaresConfig.config(app)

  // PASSPORT
  passport.use(JwtStrategy);

  return app;
}
