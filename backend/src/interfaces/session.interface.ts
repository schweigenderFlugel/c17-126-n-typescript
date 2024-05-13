export interface ISession {
  id: number;
  authId: number;
  refreshToken: string;
  lastEntry: Date;
}