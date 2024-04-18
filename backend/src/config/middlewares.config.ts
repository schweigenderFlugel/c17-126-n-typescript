// LIBRERIES
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from 'dotenv'

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { options } from './swaggerOptions'

import { envs } from './constants'


dotenv.config()

export default {
  config(app: express.Express) {
    app.use(
      cors({
        // FIXME: Change the port to vite port
        origin: ['http://localhost:8080', envs.FRONTEND_URL ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'Content-Disposition',
          'Access-Control-Allow-Origin',
          'Access-Control-Allow-Credentials',
        ],
      })
    )
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    const specs = swaggerJsdoc(options)
    app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
    app.use(cookieParser())
  },
}
