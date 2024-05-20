import { IPreferences } from '../interfaces/preference.interface'
import { IUser } from '../interfaces/user.interface'
import preferenceDao from '../models/daos/preference.dao'

export default class preferenceService {
  /**
   * Creates a preference based on the provided payload.
   *
   * @param {Omit<IPreferences, 'id'>} preferencePayload - The payload containing the preference information.
   * @return {Promise<IPreferences>} A promise that resolves to the created preference.
   */
  static async createPrefernce(
    preferencePayload: Omit<IPreferences, 'id'>
  ): Promise<IPreferences> {
    const preferenceCreated = await preferenceDao
      .getInstance()
      .createPreference(preferencePayload as IPreferences)
    return preferenceCreated
  }

  /**
   * Retrieves a preference by user ID.
   *
   * @param {IUser['id']} userId - The ID of the user.
   * @return {Promise<IPreferences | null>} A promise that resolves to the preference found, or null if not found.
   */
  static async getPreferenceByUserId(
    userId: IUser['id']
  ): Promise<IPreferences | null> {
    const preferenceFound = await preferenceDao
      .getInstance()
      .getPreferenceByUserId(userId)
    return preferenceFound
  }

  /**
   * Updates a preference by user ID.
   *
   * @param {IUser['id']} userId - The ID of the user.
   * @param {Partial<IPreferences>} preferencePayload - The payload containing the updated preference information.
   * @return {Promise<IPreferences>} A promise that resolves to the updated preference model.
   */
  static async updatePreferenceByUserId(
    userId: IUser['id'],
    preferencePayload: Partial<IPreferences>,
  ): Promise<IPreferences> {
    const preferenceUpdated = await preferenceDao
      .getInstance()
      .updatePreferenceByUserId(userId, preferencePayload)
    return preferenceUpdated
  }

  /**
   * Deletes a preference by user ID.
   *
   * @param {IUser['id']} userId - The ID of the user.
   * @return {Promise<void>} A promise that resolves when the preference is deleted.
   */
  static async deletePreferenceByUserId(userId: IUser['id']): Promise<void> {
    await preferenceDao.getInstance().deletePreferenceByUserId(userId)
  }
}
