import { Session } from "../entity/session.entity";
import { authToLogout, authToLogoutRefreshToken } from "./1-auth";

export const sessionToLogout = {
  id: 1,
  auth_id: authToLogout.id,
  user_agent: 'unknown',
  refresh_token: authToLogoutRefreshToken,
  last_entry: new Date(),
}

const sessionFixtures = [sessionToLogout];

export function up({context}: any) {
  return context.bulkInsert(Session.getTableName(), sessionFixtures);
}