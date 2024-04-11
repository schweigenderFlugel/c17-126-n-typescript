// Import environment variables here.
import 'dotenv/config'
import env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  DB_URL: env.get('DB_URL').required().asString(),
  FRONTEND_URL: env.get('FRONTEND_URL').required().asString(),
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  CLUSTER: env.get('IS_CLUSTER').asBool(),
  ACCESS_TOKEN_SECRET: env.get('ACCESS_TOKEN_SECRET').required().asString(),
  REFRESH_TOKEN_SECRET: env.get('REFRESH_TOKEN_SECRET').required().asString(),
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}
