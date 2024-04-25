export interface IPreferences {
  id?: number
  userId: number
  min_ammount_transfers: number
  max_ammount_transfers: number
}

export interface IUserPreferenceData {
  dataValues: {
    min_ammount_transfers: number;
    max_ammount_transfers: number,
  }
}
