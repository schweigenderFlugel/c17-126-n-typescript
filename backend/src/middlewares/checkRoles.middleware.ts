import { Request, Response, NextFunction } from 'express'
import HttpError from '../utils/HttpError.utils';
import { HTTP_STATUS } from '../config/constants';

type Role = { role: string };

const checkRoles = ({...roles}: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as Role;
    if (roles.includes(user.role)) {
      next();
    } else {
      throw new HttpError(
        'Unauthorized',
        'Your role is wrong',
        HTTP_STATUS.UNAUTHORIZED
      )
    }
  }
}

export default checkRoles;
