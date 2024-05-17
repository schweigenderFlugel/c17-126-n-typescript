import { IPreferences } from "../../../interfaces/preference.interface";
import { Preferences } from "../entity/preference.entity";
import { adminUser, normalUser } from "./3-user";

interface IPrefrerenceFixture extends Omit<IPreferences, 'userId'> {
  user_id: number;
}

export const preference1: IPrefrerenceFixture = {
  id: 1,
  user_id: adminUser.id,
  min_ammount_transfers: 10,
  max_ammount_transfers: 10000
}

export const preference2: IPrefrerenceFixture = {
  id: 2,
  user_id: normalUser.id,
  min_ammount_transfers: 25,
  max_ammount_transfers: 5000
}

const preferenceFixtures = [preference1, preference2];

export function up({context}: any) {
  return context.bulkInsert(Preferences.getTableName(), preferenceFixtures);
}