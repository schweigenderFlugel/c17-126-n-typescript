import { Request, Response, NextFunction } from 'express'
import Jwt from '../utils/jwt.utils'

const userAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.get('authorization');
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  Jwt.verifyToken(token, req, res, next)
}

export default userAuth;
