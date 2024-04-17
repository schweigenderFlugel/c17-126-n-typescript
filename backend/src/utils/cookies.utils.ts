import { CookieOptions, Response } from "express";
import { envs } from "../config/constants";
import { ENVIROMENTS } from "../../enviroments";

const { NODE_ENV, HTTPONLY_COOKIE_NAME } = envs;

const cookieName = NODE_ENV === ENVIROMENTS.PRODUCTION 
  ? HTTPONLY_COOKIE_NAME
  : 'bankme';

export default class CookiesUtils {
  static async setJwtCookie(res: Response, refreshToken: string) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
    }
    res.cookie(cookieName, refreshToken, options)
  }

  static async removeJwtCookie(res: Response) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }
    res.clearCookie(cookieName, options);
  }
}