import { IAuth } from "../../../interfaces/auth.interface";
import { Auth, Roles } from "../entity/auth.entity";

interface AuthFixture extends Omit<Omit<Omit<IAuth, 'activationCode'>, 'createdAt'>, 'updatedAt'> {
  activation_code: IAuth['activationCode'] | null;
  created_at: Date;
  updated_at: Date;
}

export const adminAuth: AuthFixture = {
  id: '186e2c17-b6de-4b13-bd13-e8363a8e2dbb',
  email: 'admin@email.com',
  password: "$2b$10$tdC6oY4E3/xyudIx6oNN5uolD..TU3ZEcgH9nSY2DlIaKIraqL9aa",
  role: Roles.ADMIN,
  activation_code: null,
  attempts: 0,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

export const normalAuth: AuthFixture = {
  id: 'db8c2dbd-f381-4b83-ab27-80d7d40b0772',
  email: 'normal@email.com',
  password: "$2b$10$bzSTwaSVLykm.Wzho4lW5uy8ARdHiFKNT2LytUujufPd1o/EKZKxW",
  role: Roles.NORMAL,
  activation_code: null,
  attempts: 0,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

export const authWithoutUser: AuthFixture = {
  id: '7b8caf46-b10e-497e-aff7-3424c23e5372',
  email: 'nonuser@email.com',
  password: "$2b$10$85FoRWGIr7Z1Zyo5HHHA5O1a0RzC/oDvG3t/kjQSAblO3ZGGAJ1Nu",
  role: Roles.NORMAL,
  activation_code: null,
  attempts: 0,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

export const authToLogout: AuthFixture = {
  id: '18b1a490-13a8-4f8f-9b6b-cd65d4770449',
  email: 'authlologout@email.com',
  password: '$2b$10$uACrSGlH/N60MdsxMs6eS.V5cKiaWy3SltI4YIXT.8LOeYxvABNGy',
  role: Roles.NORMAL,
  activation_code: null,
  attempts: 0,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

export const unactivatedAuth: AuthFixture = {
  id: '9c5f84bb-a4cb-4ff3-9903-03730b5aa65b',
  email: 'unactivated@email.com',
  password: '$2b$10$J6xz1mX2V.S0fotZwQIT9.6HZRTwsqRDEsT3zUzFu1x4RDjIaq.j6',
  role: Roles.NORMAL,
  activation_code: null,
  attempts: 0,
  status: false,
  created_at: new Date(),
  updated_at: new Date(),
}

export const authToActivate: AuthFixture = {
  id: '6cf65c30-e6e5-491e-92cc-eaa2ebb820c1',
  email: 'toactivate@email.com',
  password: '$2b$10$cCGuvnW5RU.6gUYd3xHhLeruLVugznf1Uer.vMCwTJUn6Td7Q.vaW',
  role: Roles.NORMAL,
  activation_code: 'LPNB-Z4Z5-FPTK-1LTS',
  attempts: 0,
  status: false,
  created_at: new Date(),
  updated_at: new Date(),
}

export const authToBlock: AuthFixture = {
  id: '8ac5b7f3-dd41-4d5b-83a9-84df82d2ce82',
  email: 'toblock@email.com',
  password: '$2b$10$1Z1SNaAaQm3NGVTNGozpA.PDwGYIc0tfiAdy7j2YN2D30l2D0tVm6',
  role: Roles.NORMAL,
  activation_code: null,
  attempts: 5,
  status: true,
  created_at: new Date(),
  updated_at: new Date(),
}

// ACCESS TOKENS
export const adminUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4NmUyYzE3LWI2ZGUtNGIxMy1iZDEzLWU4MzYzYThlMmRiYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjI0MTE1OH0.cC88mZ8UxzjUXciw1dQP8USNmyFG72h77Rf29RUbFAc";

export const normalUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiOGMyZGJkLWYzODEtNGI4My1hYjI3LTgwZDdkNDBiMDc3MiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzE4ODZ9.Ml5Hl4pJgrpIL2GFYzSm3W1mfkt-3fSMRUupgXcVDqE";

export const authWithoutUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiOGNhZjQ2LWIxMGUtNDk3ZS1hZmY3LTM0MjRjMjNlNTM3MiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzQyNTl9.79mQCAxh2oIfSFfmOsavSDz2yG4KyBR_Q69cCWm8HsM";

export const anonUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxNDA1MzhhLTIzMTMtNDEwNC04MDIwLWU4OTU5NWQ1MjFiMCIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzQzMzJ9.qYEvMWnuiPtowOl8pQ0Zbn8XprQFSvDi0oTa549CUfw";

export const unexistingAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiYzVkZGZkLTg0ODctNDUxYS1iZTgwLTlmM2JhNDYyNDVhMCIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzQ1ODN9.kWo6A5PjejTKWNV5sUIxmBUg8RaPMHa-MbJnkt9LKd0";

export const authToLogoutToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4YjFhNDkwLTEzYTgtNGY4Zi05YjZiLWNkNjVkNDc3MDQ0OSIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzIzMTN9.trMh5Zyr10FFRe6zUEh2kWJWzs8nzDCSvnm-CYZO2VY";

export const tokenWithInvalidPayload = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYjhmNDk5MmItZGE2NC00YmQ5LTkwMTctZDA3MTEzMmMwNzQ3IiwibGFzdG5hbWUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzU3OTZ9.glzinp4RayifVcpxmWm_lYDmmM1AGud_adNO7NTc15U";

// REFRESH TOKENS
export const adminUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4NmUyYzE3LWI2ZGUtNGIxMy1iZDEzLWU4MzYzYThlMmRiYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjI0MTE1OH0.cC88mZ8UxzjUXciw1dQP8USNmyFG72h77Rf29RUbFAc";

export const normalUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiOGMyZGJkLWYzODEtNGI4My1hYjI3LTgwZDdkNDBiMDc3MiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzE4ODZ9.Ml5Hl4pJgrpIL2GFYzSm3W1mfkt-3fSMRUupgXcVDqE";

export const unexistingUserRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiYzVkZGZkLTg0ODctNDUxYS1iZTgwLTlmM2JhNDYyNDVhMCIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzQ1ODN9.kWo6A5PjejTKWNV5sUIxmBUg8RaPMHa-MbJnkt9LKd0";

export const authToLogoutRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4YjFhNDkwLTEzYTgtNGY4Zi05YjZiLWNkNjVkNDc3MDQ0OSIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzIzMTN9.trMh5Zyr10FFRe6zUEh2kWJWzs8nzDCSvnm-CYZO2VY";

export const expiredRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI4ZjQ5OTJiLWRhNjQtNGJkOS05MDE3LWQwNzExMzJjMDc0NyIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MTYyMzU3OTYsImV4cCI6MTcxNjIzNTgxMX0.6SHY3r2YQlKlG1Lg1pczbiJ2kxMQAcXRYUFwnmlhS18";

const authFixtures = [
  adminAuth, 
  normalAuth, 
  authWithoutUser, 
  authToLogout, 
  unactivatedAuth, 
  authToActivate,
  authToBlock,
];

export function up({context}: any) {
  return context.bulkInsert(Auth.getTableName(), authFixtures);
}