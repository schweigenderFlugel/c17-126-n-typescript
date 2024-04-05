import express from 'express'
import cluster from 'cluster'
import { cpus } from 'os'
import { envs } from './constants'
import { sequelize } from '../models/db/postgres.manager'

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
    app.listen(envs.PORT, () => {
      console.log(
        `Servidor de express escuchando puerto ${envs.PORT} - PID WORKER ${process.pid}`
      )
    })
  }

  return app
}
