import { IPreferences } from '../../interfaces/preference.interface'
import { Preferences, PreferencesModel } from '../db/entity/preference.entity'

export default class preferenceDao {
  private static intance: preferenceDao | null = null

  private constructor() {}

  static getInstance(): preferenceDao {
    if (!this.intance) {
      this.intance = new preferenceDao()
    }

    return this.intance
  }

  /**
   * Creates a new preference using the provided preference payload.
   *
   * @param {IPreferences} preferencePayload - The payload containing the preference information.
   * @return {Promise<PreferencesModel>} A promise that resolves to the created preference model.
   */
  async createPreference(
    preferencePayload: IPreferences
  ): Promise<PreferencesModel> {
    const preferenceCreated: PreferencesModel =
      await Preferences.create(preferencePayload)
    return preferenceCreated
  }

  /**
   * Retrieves a preference by user ID.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<PreferencesModel | null>} The preference found, or null if not found.
   */
  async getPreferenceByUserId(
    userId: number
  ): Promise<PreferencesModel | null> {
    const preferencesFound = await Preferences.findOne({
      where: { userId: userId },
    })
    return preferencesFound
  }

  /**
   * Updates a preference by user ID.
   *
   * @param {number} userId - The ID of the user.
   * @param {IPreferences} preferencePayload - The payload containing the updated preference information.
   * @return {Promise<PreferencesModel>} A promise that resolves to the updated preference model.
   */
  async updatePreferenceByUserId(
    userId: number,
    preferencePayload: Omit<IPreferences, 'userId'>
  ): Promise<PreferencesModel> {
    const preferenceUpdated = await Preferences.update(preferencePayload, {
      where: { userId: userId },
      returning: true,
    })
    return preferenceUpdated[1][0]
  }

  /**
   * Deletes a preference by user ID.
   *
   * @param {number} userId - The ID of the user.
   * @return {Promise<void>} A promise that resolves when the preference is deleted.
   */
  async deletePreferenceByUserId(userId: number): Promise<void> {
    await Preferences.destroy({ where: { userId: userId } })
  }
}
