import { NextFunction, Request, Response } from 'express'
import * as crypto from 'node:crypto'
import { ERROR_MESSAGES, HTTP_STATUS } from '../config/constants'
import HttpError from '../utils/HttpError.utils'
import apiSuccessResponse from '../utils/apiResponse.utils'
import userService from '../services/user.services'
import bankAccountService from '../services/bankAccount.services'
import { IBankAccount } from '../interfaces/bankAccount.interface'
import bankAccountHelper from '../utils/bankAccountHelper'
import preferenceService from '../services/preferences.services'
import { IAllUserDataValues, ICreateUser, IUser, IUserResponse } from '../interfaces/user.interface'
import { IPreferences } from '../interfaces/preference.interface'
import { IHistorial, IMonthsResponse  } from '../interfaces/historial.interface'
import HistorialUtils from '../utils/historial.utils'
import { ITokenPayload } from '../interfaces/auth.interface'


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
      if (!req.user) throw new HttpError(
        ERROR_MESSAGES.NOT_LOGGED_IN,
        'Must be logged in',
        HTTP_STATUS.UNAUTHORIZED
      )

      const tokenPayload: ITokenPayload = req.user as ITokenPayload

      if (!tokenPayload || !tokenPayload.id) throw new HttpError(
        ERROR_MESSAGES.TOKEN_ERROR,
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )

      const userFound = await userService.getUserByAuthId(tokenPayload.id)

      if (userFound) throw new HttpError(
        ERROR_MESSAGES.USER_EXISTS,
        'User already exists',
        HTTP_STATUS.CONFLICT
      )

      const { name, lastname, alias, address, phone, accountType } = req.body

      const userPayload: ICreateUser = {
        id: crypto.randomUUID(),
        name,
        lastname,
        accountType,
        alias,
        avatar: 'image',
        address,
        phone,
        authId: tokenPayload.id,
      }

      const userCreated = await userService.createUser(userPayload)

      if (
        !userCreated ||
        !userCreated.dataValues ||
        !userCreated.dataValues.id
      ) throw new HttpError(
        'User not created',
        'User not created',
        HTTP_STATUS.SERVER_ERROR
      )

      const preferencesPayload: Omit<IPreferences, 'id'> = {
        userId: userCreated.dataValues.id,
        min_ammount_transfers: 10,
        max_ammount_transfers: 999999,
      }

      const preferencesCreated =
        await preferenceService.createPrefernce(preferencesPayload)

      if (!preferencesCreated) throw new HttpError(
        'Preferences not created',
        'Preferences not created',
        HTTP_STATUS.SERVER_ERROR
      )

      const numberAccount =
        await bankAccountHelper.generateAccountNumber(accountType)

      const bankAccountPayload: IBankAccount = {
        id: crypto.randomUUID(),
        userId: userCreated.dataValues.id,
        number_account: numberAccount,
        balance: 0,
        expenses: 0,
        investments: 0
      }

      const bankAccountCreated =
        await bankAccountService.createBankAccount(bankAccountPayload)

      if (!bankAccountCreated) throw new HttpError(
        'Bank account not created',
        'Bank account not created',
        HTTP_STATUS.SERVER_ERROR
      )

      const historialPayload: Omit<Omit<IHistorial, 'id'>, 'anual_historial_id'> = {
        month: new Date().getMonth() + 1,
        balance: bankAccountCreated.balance,
        expenses: bankAccountCreated.expenses,
        investments: bankAccountCreated.expenses,
      }

      const { anualHistorialCreated, historialCreated } = 
        await HistorialUtils.createNewAnualHistorial(bankAccountCreated.id, historialPayload)

      const month: Partial<IMonthsResponse> = {}

      const transactions = {
        sent: [],
        received: [],
      }
      
      month.jan = historialCreated.month === 1 ? { ...historialCreated.dataValues, transactions } : undefined
      month.feb = historialCreated.month === 2 ? { ...historialCreated.dataValues, transactions } : undefined
      month.mar = historialCreated.month === 3 ? { ...historialCreated.dataValues, transactions } : undefined
      month.apr = historialCreated.month === 4 ? { ...historialCreated.dataValues, transactions } : undefined
      month.may = historialCreated.month === 5 ? { ...historialCreated.dataValues, transactions } : undefined
      month.jun = historialCreated.month === 6 ? { ...historialCreated.dataValues, transactions } : undefined
      month.jul = historialCreated.month === 7 ? { ...historialCreated.dataValues, transactions } : undefined
      month.aug = historialCreated.month === 8 ? { ...historialCreated.dataValues, transactions } : undefined
      month.sep = historialCreated.month === 9 ? { ...historialCreated.dataValues, transactions } : undefined
      month.oct = historialCreated.month === 10 ? { ...historialCreated.dataValues, transactions } : undefined
      month.nov = historialCreated.month === 11 ? { ...historialCreated.dataValues, transactions } : undefined
      month.dec = historialCreated.month === 12 ? { ...historialCreated.dataValues, transactions } : undefined

      const userCreatedResponse = {
        name: userCreated.dataValues.name,
        lastname: userCreated.dataValues.lastname,
        accountType: userCreated.dataValues.accountType,
        alias: userCreated.dataValues.alias,
        address: userCreated.dataValues.address,
        phone: userCreated.dataValues.phone,
        preferences: {
          min_ammount_transfers: preferencesCreated.min_ammount_transfers,
          max_ammount_transfers: preferencesCreated.max_ammount_transfers,
        },
        bank_account: {
          number_account: bankAccountCreated.dataValues.number_account,
          balance: bankAccountCreated.dataValues.balance,
          expenses: bankAccountCreated.dataValues.expenses,
          investments: bankAccountCreated.dataValues.investments,
          anual_historial: [{
            year: anualHistorialCreated.dataValues.year,
            month: month
          }]
        }
      }

      const response = apiSuccessResponse({
        userCreatedResponse
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
        ERROR_MESSAGES.NOT_LOGGED_IN,
        'Must be logged in',
        HTTP_STATUS.UNAUTHORIZED
      )

      const tokenPayload = req.user as ITokenPayload;
      if (!tokenPayload || !tokenPayload.id) throw new HttpError(
        ERROR_MESSAGES.TOKEN_ERROR,
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )

      const userFound = await userService.getUserByAuthId(tokenPayload.id);
      
      if (!userFound) {
        throw new HttpError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'The user does not exist',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const userData: IAllUserDataValues = userFound.dataValues as unknown as IAllUserDataValues;
      const anual_historial = await HistorialUtils.generateAnualHistorial(userData);

      const userDataResponse: IUserResponse = {
        id: userData.id,
        name: userData.name,
        lastname: userData.lastname,
        accountType: userData.accountType,
        avatar: userData.avatar,
        address: userData.address,
        phone: userData.phone,        
        alias: userData.alias,
        auth: {
          id: userData.auth.dataValues.id,
          email: userData.auth.dataValues.email,
        },
        preferences: {
          min_ammount_transfers: userData.preference.dataValues.min_ammount_transfers,
          max_ammount_transfers: userData.preference.dataValues.max_ammount_transfers,
        },
        bank_account: {
          id: userData.bank_account.dataValues.id,
          number_account: userData.bank_account.dataValues.number_account,
          balance: userData.bank_account.dataValues.balance,
          expenses: userData.bank_account.dataValues.expenses,
          investments: userData.bank_account.dataValues.investments,
          anual_historial: anual_historial
        }
      }
      
      res.status(200).json(userDataResponse)
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
  static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) throw new HttpError(
        ERROR_MESSAGES.NOT_LOGGED_IN,
        'Must be logged in',
        HTTP_STATUS.UNAUTHORIZED
      )
      
      const tokenPayload = req.user as ITokenPayload;

      if (!tokenPayload || !tokenPayload.id) throw new HttpError(
        ERROR_MESSAGES.TOKEN_ERROR,
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )

      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all user with the provided alias on the request body.
   *
   * @param {Request} req - the request object containing the alias
   * @param {Response} res - the response object to send all the users that includes the letters from request body
   * @param {NextFunction} next - the next middleware function
   * @return {Promise<void>} - a promise that resolves when all users are retrieved
   */
  static async getUsersAlias(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const aliasRequest = req.body.alias as string;
    let aliases: string[] = [];
    try {
      if (!req.user) throw new HttpError(
        ERROR_MESSAGES.NOT_LOGGED_IN,
        'Must be logged in',
        HTTP_STATUS.UNAUTHORIZED
      );

      const tokenPayload = req.user as ITokenPayload;

      if (!tokenPayload || !tokenPayload.id) throw new HttpError(
        ERROR_MESSAGES.TOKEN_ERROR,
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )

      const currentUser = await userService.getUserByAuthId(tokenPayload.id);

      if (!currentUser) {
        throw new HttpError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'The user does not exist',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const users = await userService.getAllUsersAlias();

      users?.forEach(user => aliases.push(user.alias));

      const aliasesFound = aliases.filter(alias => 
        aliasRequest.split('').every(letter =>
          alias.includes(letter)
        )
      )

      const aliasesFiltered = aliasesFound.filter(alias => alias !== currentUser.alias);

      if (aliasesFiltered.length === 0) throw new HttpError(
        ERROR_MESSAGES.ALIAS_NOT_FOUND,
        'Alias not found',
        HTTP_STATUS.NOT_FOUND,
      )

      res.status(200).json(aliasesFiltered)
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
          ERROR_MESSAGES.NOT_LOGGED_IN,
          'Must be logged in',
          HTTP_STATUS.UNAUTHORIZED
        )
      }

      const userId = req.params.id as unknown as IUser['id']; 

      const userFound = await userService.getUserById(userId);

      if (!userFound) {
        throw new HttpError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'User does not exist',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const tokenPayload: ITokenPayload = req.user as ITokenPayload;

      if (!tokenPayload || !tokenPayload.id) {
        throw new HttpError(
          ERROR_MESSAGES.TOKEN_ERROR,
          'Token payload error',
          HTTP_STATUS.FORBIDDEN
        )
      }

      if (tokenPayload.id !== userFound.authId) {
        throw new HttpError(
          ERROR_MESSAGES.INVALID_CREDENTIALS,
          'The user found auth id does not match with auth id from the access token',
          HTTP_STATUS.CONFLICT
        )
      }

      const { name, lastname, alias, address, phone, min_ammount_transfers, max_ammount_transfers } = req.body;

      const userPayload: Partial<IUser> = {
        name,
        lastname,
        alias,
        address,
        phone,
        updatedAt: new Date(),
      }

      const userUpdated = await userService.updateUser(userFound.id, userPayload);

      const preferencePayload: Partial<IPreferences> = {
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
