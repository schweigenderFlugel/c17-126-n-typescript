import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import typeAccountService from '../services/typeAccount.services'
import apiSuccessResponse from '../utils/apiResponse.utils'

export default class typesAccountsController {
  /**
   * Creates a new type account.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function.
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   */
  static async createTypeAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name } = req.body
      const typeAccountFound =
        await typeAccountService.getTypeAccountByName(name)

      if (typeAccountFound) {
        throw new HttpError(
          'Type Account already exists',
          'Type Account already exists',
          HTTP_STATUS.CONFLICT
        )
      }

      const typeAccountCreated = await typeAccountService.createTypeAccount({
        name,
      })

      const respose = apiSuccessResponse(typeAccountCreated)
      res.status(HTTP_STATUS.OK).json(respose)
    } catch (err: any) {
      next(err)
    }
  }

  /**
   * Retrieves all type accounts from the server.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function.
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   */
  static async getAllTypeAccounts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const typeAccountFound = await typeAccountService.getAllAccountTypes()

      if (!typeAccountFound) {
        throw new HttpError(
          'Type Account not found',
          'Type Account not found',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const respose = apiSuccessResponse(typeAccountFound)
      res.status(HTTP_STATUS.OK).json(respose)
    } catch (err: any) {
      next(err)
    }
  }
}
