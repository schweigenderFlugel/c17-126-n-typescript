import { IPreferences } from '../interfaces/preference.interface'
import preferenceDao from '../models/daos/preference.dao'

export default class preferenceService {
  /**
   * Creates a preference based on the provided payload.
   *
   * @param {IPreferences} preferencePayload - The payload containing the preference information.
   * @return {Promise<IPreferences>} A promise that resolves to the created preference.
   */
  static async createPrefernce(
    preferencePayload: IPreferences
  ): Promise<IPreferences> {
    const preferenceCreated = await preferenceDao
      .getInstance()
      .createPreference(preferencePayload)
    return preferenceCreated
  }

  /**
   * Retrieves a preference by user ID.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<IPreferences | null>} A promise that resolves to the preference found, or null if not found.
   */
  static async getPreferenceByUserId(
    userId: number
  ): Promise<IPreferences | null> {
    const preferenceFound = await preferenceDao
      .getInstance()
      .getPreferenceByUserId(userId)
    return preferenceFound
  }

  /**
   * Updates a preference by user ID.
   *
   * @param {number} userId - The ID of the user.
   * @param {IPreferences} preferencePayload - The payload containing the updated preference information.
   * @return {Promise<IPreferences>} A promise that resolves to the updated preference model.
   */
  static async updatePreferenceByUserId(
    userId: number,
    preferencePayload: Omit<IPreferences, 'userId'>
  ): Promise<IPreferences> {
    const preferenceUpdated = await preferenceDao
      .getInstance()
      .updatePreferenceByUserId(userId, preferencePayload)
    return preferenceUpdated
  }

  /**
   * Deletes a preference by user ID.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<void>} A promise that resolves when the preference is deleted.
   */
  static async deletePreferenceByUserId(userId: number): Promise<void> {
    await preferenceDao.getInstance().deletePreferenceByUserId(userId)
  }
}
