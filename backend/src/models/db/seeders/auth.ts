import { QueryInterface } from "sequelize";
import { IAuth } from "../../../interfaces/auth.interface";
import { AUTH_TABLE, Roles } from "../entity/auth.entity";

interface AuthFixture extends Omit<IAuth, 'id'> {}

const adminUser: AuthFixture = {
  email: 'admin@email.com',
  password: '',
  refreshToken: null,
  role: Roles.ADMIN,
  status: true,
}

const normalUser: AuthFixture = {
  email: 'normal@email.com',
  password: '',
  refreshToken: null,
  role: Roles.NORMAL,
  status: true,
}

const authFixtures = [adminUser, normalUser];

export default {
  up: async(queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(AUTH_TABLE, authFixtures);
  },
  down: async(queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(AUTH_TABLE, {})
  }
}