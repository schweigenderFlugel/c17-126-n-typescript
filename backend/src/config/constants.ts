// Import environment variables here.
import 'dotenv/config'
import env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  DB_URL: env.get('DB_URL').required().asString(),
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  CLUSTER: env.get('IS_CLUSTER').asBool(),
}
