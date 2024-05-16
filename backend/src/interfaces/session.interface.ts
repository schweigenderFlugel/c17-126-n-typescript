export interface ISession {
  id: number;
  authId: number;
  userAgent: string | undefined;
  refreshToken: string | null;
  lastEntry: Date | null;
}