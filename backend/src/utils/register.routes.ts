import { Express } from 'express'
import fs from 'fs/promises'
import path from 'path'

const removeExtension = (fileName: string) => fileName.split('.').shift()

/**
 * Registers routes for a specific version of the API.
 *
 * @param express - The Express application instance.
 * @param version - The version of the API.
 * @returns {Promise<void>} - A promise that resolves when all routes are registered.
 */
const RegisterRoutes = async (express: Express, version: string) => {
  const dirname = path.join(__dirname, '../router', version)
  const startTime = Date.now()

  try {
    const fileNames = await fs.readdir(dirname)

    await Promise.all(
      fileNames.map(async fileName => {
        const file = removeExtension(fileName)

        const item = await import(path.join(dirname, fileName))

        if (typeof item.default === 'function' && item.default.stack) {
          express.use(`/api/${version}/${file}`, item.default)
        } else {
          console.error(
            `La ruta '${file}' en la versión '${version}' no es una ruta express válida.`
          )
        }
      })
    )
  } catch (error) {
    console.log(error)
  } finally {
    const endTime = Date.now()
    const time = (endTime - startTime) / 1000

    console.log(`Register routes for '${version}' in ${time} segundos.`)
  }
}

export default RegisterRoutes
