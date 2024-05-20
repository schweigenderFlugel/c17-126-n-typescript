import { IAuth } from "./auth.interface";

export interface ISession {
  id: `${string}-${string}-${string}-${string}-${string}`;
  authId: IAuth['id'];
  userAgent: string | undefined;
  refreshToken: string | null;
  lastEntry: Date | null;
}