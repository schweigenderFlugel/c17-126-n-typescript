import { CookieOptions, Response } from "express";
import { envs } from "../config/constants";

const { HTTPONLY_COOKIE_NAME } = envs;

export default class CookiesUtils {
  static async setJwtCookie(res: Response, refreshToken: string) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
    }
    res.cookie(HTTPONLY_COOKIE_NAME, refreshToken, options)
  }

  static async removeJwtCookie(res: Response) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }
    res.clearCookie(HTTPONLY_COOKIE_NAME, options);
  }
}