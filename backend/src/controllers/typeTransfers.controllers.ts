import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '../config/constants'
import typeTransfersService from '../services/typeTransfers.services'
import HttpError from '../utils/HttpError.utils'
import apiSuccessResponse from '../utils/apiResponse.utils'

export default class typeTransfersController {
  /**
   * Creates a new type transfer.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @param {NextFunction} next - the next function
   * @return {Promise<void>} a promise that resolves to void
   */
  static async createTypeTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, description } = req.body
      const typeTransferFound =
        await typeTransfersService.getTypeTransfersByName(name)
      if (typeTransferFound) {
        throw new HttpError(
          'Type Transfer already exists',
          'Type Transfer already exists',
          HTTP_STATUS.CONFLICT
        )
      }

      const typeTransferCreated =
        await typeTransfersService.createTypeTransfers({
          name,
          description,
        })
      if (!typeTransferCreated) {
        throw new HttpError(
          'Type Transfer not created',
          'Type Transfer not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      const response = apiSuccessResponse(typeTransferCreated)

      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err: any) {
      next(err)
    }
  }

  /**
   * Retrieves all type transfers from the server.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function.
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   */
  static async getAllTypeTransfers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const typeTransfers = await typeTransfersService.getAllTypeTransfers()

      if (!typeTransfers) {
        throw new HttpError(
          'Type Transfers not found',
          'Type Transfers not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const response = apiSuccessResponse(typeTransfers)
      res.status(HTTP_STATUS.OK).json(response)
    } catch (err: any) {
      next(err)
    }
  }
}
