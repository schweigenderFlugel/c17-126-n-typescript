import { Request, Response } from 'express'
export default class userController {
  /**
   * A description of the entire function.
   *
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @return {Promise<void>} returns a promise with void
   */
  static async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body
      return res.json({ name })
    } catch {
      // TODO: Handle error and use a logger
      return res.status(500).json({ error: 'Error creating user' })
    }
  }
}
