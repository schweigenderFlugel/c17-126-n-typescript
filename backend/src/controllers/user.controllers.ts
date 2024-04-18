import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import { ITokenPayload } from '../interfaces/token.interface'
import apiSuccessResponse from '../utils/apiResponse.utils'
import typeAccountService from '../services/typeAccount.services'
import { ICreateUser } from '../interfaces/user.interface'
import userService from '../services/user.services'
import bankAccountService from '../services/bankAccount.services'
import { IBankAccount } from '../interfaces/bankAccount.interface'
import bankAccountHelper from '../utils/bankAccountHelper'
export default class userController {
  /**
   * Creates a new user with the provided request body data.
   *
   * @param {Request} req - the request object containing user data
   * @param {Response} res - the response object to send the created user data
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the user is created
   */
  static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new HttpError(
          'User not found',
          'Must be logged in',
          HTTP_STATUS.UNAUTHORIZED
        )
      }
      
      const tokenPayload: ITokenPayload = req.user as ITokenPayload;

      if (!tokenPayload || !tokenPayload.id) {
        throw new HttpError(
          'Token payload error',
          'Token payload error',
          HTTP_STATUS.BAD_REQUEST
        )
      }

      const userFound = await userService.getUserByAuthId(tokenPayload.id);

      if (userFound) {
        throw new HttpError(
          'User already exists',
          'User already exists',
          HTTP_STATUS.CONFLICT
        )
      }

      const { name, lastname, alias, address, phone, accountType } = req.body

      const accountTypeFound =
        await typeAccountService.getTypeAccountById(accountType)

      if (
        !accountTypeFound ||
        !accountTypeFound.dataValues ||
        !accountTypeFound.dataValues.id
      ) {
        throw new HttpError(
          'Account type not found',
          'Must provide valid account type',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const userPayload: ICreateUser = {
        name,
        lastname,
        alias,
        address,
        phone,
        authId: tokenPayload.id,
      }

      const userCreated = await userService.createUser(userPayload)

      if (
        !userCreated ||
        !userCreated.dataValues ||
        !userCreated.dataValues.id
      ) {
        throw new HttpError(
          'User not created',
          'User not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      const numberAccount =
        await bankAccountHelper.generateAccountNumber(accountTypeFound)

      const bankAccountPayload: IBankAccount = {
        type_account_id: accountTypeFound.dataValues.id,
        user_id: userCreated.dataValues.id,
        number_account: numberAccount,
        balance: 0,
      }

      const bankAccountCreated =
        await bankAccountService.createBankAccount(bankAccountPayload)

      if (!bankAccountCreated) {
        throw new HttpError(
          'Bank account not created',
          'Bank account not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      const response = apiSuccessResponse({ userCreated, bankAccountCreated })
      res.status(200).json(response)
    } catch (err: any) {
      next(err)
    }
  }
}
