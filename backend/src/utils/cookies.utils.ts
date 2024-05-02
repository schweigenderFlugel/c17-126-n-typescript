import { CookieOptions, Response } from 'express'

export default class CookiesUtils {
  static async setJwtCookie(name: string, res: Response, refreshToken: string) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    }
    res.cookie(name, refreshToken, options)
  }

  static async removeJwtCookie(name: string, res: Response) {
    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }
    res.clearCookie(name, options)
  }
}
