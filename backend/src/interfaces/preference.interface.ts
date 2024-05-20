import { IUser } from "./user.interface";

export interface IPreferences {
  id: `${string}-${string}-${string}-${string}-${string}-${string}-`;
  userId: IUser['id']
  min_ammount_transfers: number
  max_ammount_transfers: number
}

export interface IPreferenceDataValues {
  dataValues: {
    min_ammount_transfers: number;
    max_ammount_transfers: number,
  }
}
