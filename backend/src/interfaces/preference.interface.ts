export interface IPreferences {
  id?: number
  user_id: number
  max_ammount_transfers: number
}

export interface IUserPreferenceData {
  dataValues: { max_ammount_transfers: number }
}
