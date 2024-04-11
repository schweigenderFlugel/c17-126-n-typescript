import { Response, Request, NextFunction } from 'express'
import { AnyZodObject, ZodError, ZodTypeAny } from 'zod'
import { HTTP_STATUS } from '../config/constants'

/**
 * Validates the incoming request body and parameters against the provided schemas and handles any validation errors.
 *
 * @param {AnyZodObject | null} schema - The schema to validate the request body against, can be null.
 * @param {ZodTypeAny | null} paramsSchema - The schema to validate the request parameters against, can be null.
 * @return {(req: Request, res: Response, next: NextFunction) => void} A function to handle the validation logic.
 */
const schemaValidator = (
  schema: AnyZodObject | null,
  paramsSchema: ZodTypeAny | null
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema) {
        schema.parse(req.body)
      }

      if (paramsSchema) {
        paramsSchema.parse(req.params.id)
      }
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          error.issues.map(issue => ({
            path: issue.path[0],
            message: issue.message,
          }))
        )
      }
      return res
        .status(HTTP_STATUS.SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}

export default schemaValidator
