import { Express } from 'express'
import path from 'path'

/**
 * Register routes for the given version using Express.
 *
 * @param {Express} express - the Express instance
 * @param {string} version - the version of the routes to register
 */
const RegisterRoutes = async (express: Express, version: string) => {
  const dirname = path.join(__dirname, '../router', version)
  const startTime = Date.now()

  try {
    const item = await import(path.join(dirname, 'api.routes'))
    if (typeof item.default === 'function' && item.default.stack) {
      express.use(`/api/${version}`, item.default)
    } else {
      console.error(
        `La ruta en la versión '${version}' no es una ruta express válida.`
      )
    }
  } catch (error) {
    console.log(error)
  } finally {
    const endTime = Date.now()
    const time = (endTime - startTime) / 1000

    console.log(`Register routes for '${version}' in ${time} segundos.`)
  }
}

export default RegisterRoutes
