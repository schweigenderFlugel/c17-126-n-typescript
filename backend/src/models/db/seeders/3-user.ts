import { AccountType, IUser } from "../../../interfaces/user.interface";
import { User } from "../entity/user.entity";
import { adminAuth, normalAuth } from "./1-auth";

interface UserFixture extends Omit<Omit<Omit<Omit<IUser, 'authId'>, 'createdAt'>, 'updatedAt'>, 'accountType'> {
  account_type: AccountType;
  auth_id: number;
  created_at: Date;
  updated_at: Date;
}

export const adminUser: UserFixture = {
  id: 1,
  name: "admin",
  lastname: "admin",
  avatar: 'image',
  account_type: "enterprise",
  alias: "admin",
  address: 'fake street 123',
  phone: "(000)-000-0000",
  auth_id: adminAuth.id,
  created_at: new Date(),
  updated_at: new Date(),
}

export const normalUser: UserFixture = {
  id: 2,
  name: "normal",
  lastname: "normal",
  avatar: 'image',
  account_type: 'personal',
  alias: "normal",
  address: 'fake street 123',
  phone: "(000)-000-0000",
  auth_id: normalAuth.id,
  created_at: new Date(),
  updated_at: new Date(),
}

const userFixtures = [adminUser, normalUser];

export function up({context}: any) {
  return context.bulkInsert(User.getTableName(), userFixtures);
}