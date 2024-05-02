import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import { ITokenPayload } from '../interfaces/token.interface'
import apiSuccessResponse from '../utils/apiResponse.utils'
import userService from '../services/user.services'
import bankAccountService from '../services/bankAccount.services'
import { IGenerateBankAccount } from '../interfaces/bankAccount.interface'
import bankAccountHelper from '../utils/bankAccountHelper'
import preferenceService from '../services/preferences.services'
import { ICreateUser, IUpdateUser } from '../interfaces/user.interface'
import { IPreferences } from '../interfaces/preference.interface'


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
          'Not logged in',
          'Must be logged in',
          HTTP_STATUS.UNAUTHORIZED
        )
      }

      const tokenPayload: ITokenPayload = req.user as ITokenPayload

      if (!tokenPayload || !tokenPayload.id) {
        throw new HttpError(
          'Token payload error',
          'Token payload error',
          HTTP_STATUS.FORBIDDEN
        )
      }

      const userFound = await userService.getUserByAuthId(tokenPayload.id)

      if (userFound) {
        throw new HttpError(
          'User already exists',
          'User already exists',
          HTTP_STATUS.CONFLICT
        )
      }

      const { name, lastname, alias, address, phone, accountType } = req.body

      const userPayload: ICreateUser = {
        name,
        lastname,
        accountType,
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
        await bankAccountHelper.generateAccountNumber(accountType)

      const bankAccountPayload: IGenerateBankAccount = {
        userId: userCreated.dataValues.id,
        number_account: numberAccount,
        balance: 0,
        expenses: 0,
        investments: 0
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

      const preferencesPayload = {
        userId: userCreated.dataValues.id,
        min_ammount_transfers: 10,
        max_ammount_transfers: 999999,
      }

      const preferencesCreated =
        await preferenceService.createPrefernce(preferencesPayload)

      if (!preferencesCreated) {
        throw new HttpError(
          'Preferences not created',
          'Preferences not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      const response = apiSuccessResponse({
        userCreated,
        bankAccountCreated,
        preferencesCreated,
      })
      res.status(200).json(response)
    } catch (err: any) {
      next(err)
    }
  }

  /**
   * Get an user with the provided auth id on the request.
   *
   * @param {Request} req - the request object containing the auth id
   * @param {Response} res - the response object to send the user
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the user is found
   */
  static async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) throw new HttpError(
        'Not logged in',
        'Must be logged in',
        HTTP_STATUS.UNAUTHORIZED
      )
      const tokenPayload = req.user as ITokenPayload;
      if (!tokenPayload || !tokenPayload.id) throw new HttpError(
        'Token payload error',
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )
      const userFound = await userService.getUserByAuthId(tokenPayload.id)
      if (!userFound) {
        throw new HttpError(
          'User not found',
          'The user does not exist',
          HTTP_STATUS.NOT_FOUND
        )
      }
      res.status(200).json(userFound)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all user with the provided access token with admin role.
   *
   * @param {Request} req - the request object containing the admin role
   * @param {Response} res - the response object to send all the users
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when all users are retrieved
   */
  static async getAllUser(
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
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Update the user with the correct token and provided request body data.
   *
   * @param {Request} req - the request object containing the token payload and user data
   * @param {Response} res - the response object to send the message of user updated
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when the user is updated
   */
  static async updateUser(
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

      const userId = req.params.id as unknown as number; 

      const userFound = await userService.getUserById(userId);

      if (!userFound) {
        throw new HttpError(
          'User does not exist',
          'User does not exist',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const tokenPayload: ITokenPayload = req.user as ITokenPayload;

      if (!tokenPayload || !tokenPayload.id) {
        throw new HttpError(
          'Token payload error',
          'Token payload error',
          HTTP_STATUS.FORBIDDEN
        )
      }

      if (tokenPayload.id !== userFound.authId) {
        throw new HttpError(
          'Ids Conflict',
          'The user found auth id does not match with auth id from the access token',
          HTTP_STATUS.CONFLICT
        )
      }

      const { name, lastname, alias, address, phone, min_ammount_transfers, max_ammount_transfers } = req.body;

      const userPayload: IUpdateUser = {
        id: userFound.id,
        name,
        lastname,
        alias,
        address,
        phone,
        updatedAt: new Date(),
      }

      const userUpdated = await userService.updateUser(userPayload.id, userPayload);

      const preferencePayload: Omit<IPreferences, 'userId'> = {
        min_ammount_transfers: min_ammount_transfers,
        max_ammount_transfers: max_ammount_transfers,
      }

      const preferenceUpdated = await preferenceService.updatePreferenceByUserId(userFound.id, preferencePayload)

      const response = apiSuccessResponse({ userUpdated, preferenceUpdated })
      res.status(201).json(response)
    } catch (err: any) {
      next(err)
    }
  }
}
