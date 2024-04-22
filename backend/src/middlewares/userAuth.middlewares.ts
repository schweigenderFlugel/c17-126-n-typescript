import { Request, Response, NextFunction } from 'express'
import SessionUtils from '../utils/session.util'

const userAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.get('authorization');
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  SessionUtils.verifyToken(token, req, res, next)
}

export default userAuth;
