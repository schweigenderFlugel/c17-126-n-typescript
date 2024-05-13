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
import { IAllUserData, ICreateUser, IUpdateUser, IUserResponse } from '../interfaces/user.interface'
import { IPreferences } from '../interfaces/preference.interface'
import { IAnualHistorial, IAnualHistorialResponse } from '../interfaces/anualHistorial.interface'
import anualHistorialService from '../services/anualHistorial.services'
import { IHistorial, IMonths, IUserHistorial } from '../interfaces/historial.interface'
import historialService from '../services/historial.services'
import { number } from 'zod'


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

      const anualHistorialPayload: Omit<IAnualHistorial, 'id'> = {
        bank_account: bankAccountCreated.id,
        year: new Date().getFullYear(),
      }

      const anualHistorialCreated = 
        await anualHistorialService.createAnualHistorial(anualHistorialPayload)

      if (!anualHistorialCreated) {
        throw new HttpError(
          'Anual historial not created',
          'Anual historial not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }

      const historialPayload: Omit<IHistorial, 'id'> = {
        anual_historial_id: anualHistorialCreated.id,
        month: new Date().getMonth() + 1,
        balance: bankAccountCreated.balance,
        expenses: bankAccountCreated.expenses,
        investments: bankAccountCreated.expenses,
      }

      const historialCreated = 
        await historialService.createHistorial(historialPayload)

      if (!historialCreated) {
        throw new HttpError(
          'Historial not created',
          'Historial not created',
          HTTP_STATUS.SERVER_ERROR
        )
      }
      const response = apiSuccessResponse({
        userCreated,
        preferencesCreated,
        bankAccountCreated,
        anualHistorialCreated,
        historialCreated,
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
      const userFound = await userService.getUserByAuthId(tokenPayload.id);
      
      if (!userFound) {
        throw new HttpError(
          'User not found',
          'The user does not exist',
          HTTP_STATUS.NOT_FOUND
        )
      }

      const userData: IAllUserData = userFound.dataValues as unknown as IAllUserData;

      // console.log(userData.bank_account.dataValues.anual_historial[0].dataValues.months[0].dataValues.transactions_received[0].dataValues.from.dataValues.user.dataValues.lastname);

      let anual_historials: Partial<IAnualHistorialResponse[]> = [];

      userData.bank_account.dataValues.anual_historial.forEach(item => {
        anual_historials.push({ year: item.dataValues.year, month: {} });
        item.dataValues.months.forEach(historial => {
          switch (historial.dataValues.month) {
            case 1:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.jan = historial.dataValues;
                }
              })
              break
            case 2:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.feb = historial.dataValues;
                }
              })
              break
            case 3:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.mar = historial.dataValues;
                }
              })
              break
            case 4:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.apr = historial.dataValues;
                }
              })
              break
            case 5:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.may = historial.dataValues;
                }
              })
              break
            case 6:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.jun = historial.dataValues;
                }
              })
              break
            case 7:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.jul = historial.dataValues;
                }
              })
              break
            case 8:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.aug = historial.dataValues;
                }
              })
              break
            case 9:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.sep = historial.dataValues;
                }
              })
              break
            case 10:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.oct = historial.dataValues;
                }
              })
              break
            case 11:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.nov = historial.dataValues;
                }
              })
              break
            case 12:
              anual_historials.forEach(anual_historial => {
                if (anual_historial?.year === historial.dataValues.year.dataValues.year) {
                  anual_historial.month.dec = historial.dataValues;
                }
              })
              break
          }
        });
      })

      const userDataResponse: IUserResponse = {
        id: userData.id,
        name: userData.name,
        lastname: userData.lastname,
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
          number_account: userData.bank_account.dataValues.number_account,
          balance: userData.bank_account.dataValues.balance,
          expenses: userData.bank_account.dataValues.expenses,
          investments: userData.bank_account.dataValues.investments,
          anual_historial: anual_historials,
        }
      }

      console.log(userDataResponse.bank_account.anual_historial[0]?.month.nov?.transactions_received[1].dataValues)

      res.status(200).json(userDataResponse)
    } catch (error) {
      console.log(error)
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
        'Not logged in',
        'Must be logged in',
        HTTP_STATUS.UNAUTHORIZED
      );

      const tokenPayload = req.user as ITokenPayload;

      if (!tokenPayload || !tokenPayload.id) throw new HttpError(
        'Token payload error',
        'Token payload error',
        HTTP_STATUS.FORBIDDEN
      )

      const currentUser = await userService.getUserByAuthId(tokenPayload.id);

      if (!currentUser) {
        throw new HttpError(
          'Current user not found',
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
        'Alias not found',
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
        name,
        lastname,
        alias,
        address,
        phone,
        updatedAt: new Date(),
      }

      const userUpdated = await userService.updateUser(userFound.id, userPayload);

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
