import { IAuth } from "../../../interfaces/auth.interface";
import { AUTH_TABLE, Roles } from "../entity/auth.entity";

interface AuthFixture extends Omit<IAuth, 'id'> {}

const adminAuth: AuthFixture = {
  email: 'admin@email.com',
  password: "$2b$10$WfM1hoVWH8R/i0fC34Lh2.lzpLYP/i3ki7mLz62lAFchQw0yJC.Ue",
  refreshToken: null,
  role: Roles.ADMIN,
  status: true,
}

const normalAuth: AuthFixture = {
  email: 'normal@email.com',
  password: "$2b$10$85FoRWGIr7Z1Zyo5HHHA5O1a0RzC/oDvG3t/kjQSAblO3ZGGAJ1Nu",
  refreshToken: null,
  role: Roles.NORMAL,
  status: true,
}

export const adminUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMzgzMTUwfQ.mMgrhUQ90TXRBA0LGJaMC7hy-s5C6Bh2n5GKSQ1KnzY";

export const normalUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzM4Mjg3N30.DygB6yrclBJQftKmTORIdmV4aZV58HM4cCNeL8XEW7s";

export const adminUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMzgzMTUwfQ.mMgrhUQ90TXRBA0LGJaMC7hy-s5C6Bh2n5GKSQ1KnzY";

export const normalUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6Im5vcm1hbCIsImlhdCI6MTcxMzM4NDU2NH0.XA4QJRy-yoJZWC_mLyiTlLhbGWWYYDMTHDhr_FvUXow";

export const expiredRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMzg0MjI3LCJleHAiOjE3MTMzODQyMzd9.HQeDUcSZD-hIcmxzgVJEbFJ5HFhujANZrJ8UgIraQpg";

const authFixtures = [adminAuth, normalAuth];

export function up({context}: any) {
  return context.bulkInsert(AUTH_TABLE, authFixtures);
}