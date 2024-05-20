import { IAuth } from "../interfaces/auth.interface";

export default class CodeUtils {
  static generateActivationCode(): IAuth['activationCode'] {
    const length = 4;
    let base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '123456789';
    base += numbers;
    let block1: string = '';
    let block2: string = '';
    let block3: string = '';
    let block4: string = '';
    let code: IAuth['activationCode'] = `''-''-''-''`;
    for (let x = 0; x < length; x++ ) {
      const random1 = Math.floor(Math.random() * base.length);
      const random2 = Math.floor(Math.random() * base.length);
      const random3 = Math.floor(Math.random() * base.length);
      const random4 = Math.floor(Math.random() * base.length);
      block1 += base.charAt(random1).toUpperCase();
      block2 += base.charAt(random2).toUpperCase();
      block3 += base.charAt(random3).toUpperCase();
      block4 += base.charAt(random4).toUpperCase();
      code = `${block1}-${block2}-${block3}-${block4}`
    }
    return code;
  }
}