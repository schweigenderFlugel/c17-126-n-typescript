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
  RECOVERY_TOKEN_SECRET: env.get('RECOVERY_TOKEN_SECRET').required().asString(),
  SECRET_KEY: env.get('SECRET_KEY').required().asString(),
  IV: env.get('IV').required().asString(),
  HTTPONLY_COOKIE_NAME: env.get('HTTPONLY_COOKIE_NAME').required().asString(),
  CLOUDINARY_CLOUDNAME: env.get('CLOUDINARY_CLOUDNAME').asString(),
  CLOUDINARY_API_KEY: env.get('CLOUDINARY_API_KEY').asString(),
  CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').asString(),
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

export enum TYPETRANSFERS {
  INMEDIATE = 'inmediate',
  DEFERRED = 'deferred',
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum TRANSACTION_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}
