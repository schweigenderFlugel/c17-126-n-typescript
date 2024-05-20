import { IAuth } from '../../interfaces/auth.interface'
import { ISession } from '../../interfaces/session.interface'
import { Session, SessionModel } from '../db/entity/session.entity'

export default class sessionDao {
  private static instance: sessionDao | null = null

  private constructor() {}

  static getInstance(): sessionDao {
    if (!this.instance) {
      this.instance = new sessionDao()
    }
    return this.instance
  }

  /**
   * Create a session record.
   *
   * @param {ISession} authPayload - the session payload to create
   * @return {Promise<SessionModel>} the created session record
   */
  async createSession(authPayload: ISession): Promise<SessionModel> {
    const sessionCreated: SessionModel = await Session.create(authPayload)
    return sessionCreated
  }

  /**
   * Retrieve session information by auth id.
   *
   * @param {number} authId - The auth id for session information to retrieve.
   * @return {Promise<SessionModel[] | null>} The retrieved session information, or null if not found.
   */
  async getSessionsRecordsById(authId: IAuth['id']): Promise<SessionModel[] | null> {
    const sessionsFound: SessionModel[] | null = await Session.findAll({
      where: { authId: authId }
    })
    return sessionsFound
  }

  /**
   * A function that updates session information.
   *
   * @param {number} authId - the auth id of the session information to update
   * @param {IAuth} sessionPayload - the new authentication payload
   * @return {Promise<SessionModel | null>} the updated authentication model or null if not found
   */
  async updateSession(id: ISession['id'], sessionPayload: Partial<ISession>): Promise<SessionModel | null> {
    const authUpdated = await Session.update(sessionPayload, {
      where: { id: id },
      returning: true,
    })
    return authUpdated[1][0]
  }

  /**
   * A function that deletes a session record.
   *
   * @param {IAuth['id']} id - The ID of the session record to delete
   * @return {Promise<SessionModel | null>} The deleted session record or null if not found
   */
  async deleteSession(id: IAuth['id']): Promise<SessionModel | null> {
    await Session.destroy({
      where: { id },
    })
    return null;
  }
}
