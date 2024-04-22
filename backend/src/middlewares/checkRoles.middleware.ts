import { Request, Response, NextFunction } from 'express'
import HttpError from '../utils/HttpError.utils';
import { HTTP_STATUS } from '../config/constants';
import { Roles } from '../models/db/entity/auth.entity';

type Role = { role: string };

const checkRoles = (...roles: (string | Roles[])[]) => {
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
