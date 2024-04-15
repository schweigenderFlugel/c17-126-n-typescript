import { IAuth } from "../../interfaces/auth.interface";
import { Roles } from "../../models/db/entity/auth.entity";

interface AuthFixture extends Omit<IAuth, 'id'> {}

export const adminUser: AuthFixture = {
  email: 'admin@email.com',
  password: '',
  refreshToken: null,
  role: Roles.ADMIN,
  status: true,
}

export const normalUser: AuthFixture = {
  email: 'normal@email.com',
  password: '',
  refreshToken: null,
  role: Roles.NORMAL,
  status: true,
}

export const authFixtures = [adminUser, normalUser];