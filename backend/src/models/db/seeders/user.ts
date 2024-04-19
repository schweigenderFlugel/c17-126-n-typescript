import { AccountType, IUser } from "../../../interfaces/user.interface";
import { User } from "../entity/user.entity";

interface UserFixture extends Omit<Omit<Omit<Omit<Omit<IUser, 'id'>, 'authId'>, 'createdAt'>, 'updatedAt'>, 'accountType'> {
  account_type: AccountType;
  auth_id: number;
  created_at: Date;
  updated_at: Date;
}

export const adminUser: UserFixture = {
  name: "admin",
  lastname: "admin",
  account_type: "enterprise",
  alias: "admin",
  address: 'fake street 123',
  phone: "(000)-000-0000",
  auth_id: 1,
  created_at: new Date(),
  updated_at: new Date(),
}

export const normalUser: UserFixture = {
  name: "normal",
  lastname: "normal",
  account_type: 'personal',
  alias: "normal",
  address: 'fake street 123',
  phone: "(000)-000-0000",
  auth_id: 2,
  created_at: new Date(),
  updated_at: new Date(),
}

const userFixtures = [adminUser, normalUser];

export function up({context}: any) {
  return context.bulkInsert(User.getTableName(), userFixtures);
}