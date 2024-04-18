import { IAuth } from "../../../interfaces/auth.interface";
import { Auth, Roles } from "../entity/auth.entity";

interface AuthFixture extends Omit<Omit<Omit<Omit<IAuth, 'id'>, 'refreshToken'>, 'createdAt'>, 'updatedAt'> {
  refresh_token: string | null;
  created_at: Date;
  updated_at: Date;
}

const adminAuth: AuthFixture = {
  email: 'admin@email.com',
  password: "$2b$10$WfM1hoVWH8R/i0fC34Lh2.lzpLYP/i3ki7mLz62lAFchQw0yJC.Ue",
  refresh_token: null,
  role: Roles.ADMIN,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

const normalAuth: AuthFixture = {
  email: 'normal@email.com',
  password: "$2b$10$85FoRWGIr7Z1Zyo5HHHA5O1a0RzC/oDvG3t/kjQSAblO3ZGGAJ1Nu",
  refresh_token: null,
  role: Roles.NORMAL,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

const nonAuth: AuthFixture = {
  email: 'nonuser@email.com',
  password: "$2b$10$85FoRWGIr7Z1Zyo5HHHA5O1a0RzC/oDvG3t/kjQSAblO3ZGGAJ1Nu",
  refresh_token: null,
  role: Roles.NORMAL,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

export const adminUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMzgzMTUwfQ.mMgrhUQ90TXRBA0LGJaMC7hy-s5C6Bh2n5GKSQ1KnzY";

export const normalUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzQ4MDM4MX0.uf6OvGINpsGhY3DLNOQQwUYaRsgX5ZbqOV51ZK_SEJk";

export const adminUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMzgzMTUwfQ.mMgrhUQ90TXRBA0LGJaMC7hy-s5C6Bh2n5GKSQ1KnzY";

export const normalUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzQ4MDM4MX0.uf6OvGINpsGhY3DLNOQQwUYaRsgX5ZbqOV51ZK_SEJk";

export const nonUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzQ2MzY5M30.T965-Oo-Rg0yg2GiAR9yl5elCFhBjyh3XaUCay6N5vU";

export const nonUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzQ2MzY5M30.T965-Oo-Rg0yg2GiAR9yl5elCFhBjyh3XaUCay6N5vU";

export const anonUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzQ2NTY0NX0.UEnbMzafoGfCbKrW_sJn_5SXLt3w4aHB3xHo-aELDCE";

export const anonUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzQ2NTY0NX0.UEnbMzafoGfCbKrW_sJn_5SXLt3w4aHB3xHo-aELDCE";

export const expiredRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMzg0MjI3LCJleHAiOjE3MTMzODQyMzd9.HQeDUcSZD-hIcmxzgVJEbFJ5HFhujANZrJ8UgIraQpg";

const authFixtures = [adminAuth, normalAuth, nonAuth];

export function up({context}: any) {
  return context.bulkInsert(Auth.getTableName(), authFixtures);
}