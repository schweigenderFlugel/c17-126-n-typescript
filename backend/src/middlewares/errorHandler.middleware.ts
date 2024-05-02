import { Request, Response, NextFunction } from 'express'
import HttpError from '../utils/HttpError.utils'

/**
 * Handles errors that occur during the request-response cycle.
 *
 * @param {HttpError} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {void}
 */
export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.status || 500
  const message = err.description || 'Internal Server Error'
  const details = err.details || ''

  const errorResponse = {
    status: statusCode,
    error: {
      message,
      details,
    },
  }

  res.status(statusCode).json(errorResponse)
}
