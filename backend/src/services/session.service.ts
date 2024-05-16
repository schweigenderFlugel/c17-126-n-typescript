import { ISession } from '../interfaces/session.interface'; 
import sessionDao from '../models/daos/session.dao';

export default class sessionService {
  /**
   * A description of the entire function.
   *
   * @param {IAuth} sessionPayload - description of parameter
   * @return {Promise<ISession>} description of return value
   */
  static async createSession(sessionPayload: Omit<ISession, 'id'>): Promise<ISession> {
    const authCreated = await sessionDao.getInstance().createSession(sessionPayload as ISession)
    return authCreated;
  }

  /**
   * A description of the entire function.
   *
   * @param {number} authId - description of parameter
   * @return {Promise<ISession[]>} description of return value
   */
  static async getSessionsByAuthId(authId: number): Promise<ISession[]> {
    const authFound = await sessionDao.getInstance().getSessionsRecordsById(authId)
    return authFound as ISession[]
  }

  /**
   * Update session information.
   *
   * @param {number} id - The ID of the session information.
   * @param {IAuth} sessionPayload - The updated session payload.
   * @return {Promise<ISession>} The updated session information or null if not found.
   */
  static async updateSession(
    id: number,
    sessionPayload: Partial<ISession>
  ): Promise<ISession> {
    const sessionUpdated = await sessionDao.getInstance().updateSession(id, sessionPayload)
    return sessionUpdated as ISession;
  }

  /**
   * Delete session information by ID.
   *
   * @param {number} id - The ID of the session information to delete.
   * @return {Promise<ISession | null>} The deleted session information if successful, otherwise null.
   */
  static async deleteAuth(id: number): Promise<ISession> {
    const sessionDeleted = await sessionDao.getInstance().deleteSession(id)
    return sessionDeleted as ISession
  }
}
