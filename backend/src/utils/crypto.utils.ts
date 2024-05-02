import * as crypto from 'crypto';
import { envs } from '../config/constants';
import { ENVIROMENTS } from '../../enviroments';
import { ITokenPayload } from '../interfaces/token.interface';

const { NODE_ENV, SECRET_KEY, IV } = envs;

const iv: Buffer = NODE_ENV === ENVIROMENTS.PRODUCTION
  ? Buffer.from(IV, 'hex')
  : Buffer.from('ae68552db093145d3df953b385cd3034', 'hex');

const secretKey: Buffer = NODE_ENV === ENVIROMENTS.PRODUCTION
  ? Buffer.from(SECRET_KEY, 'hex')
  : Buffer.from('13a21323ddb55d45a59ea84a0c385a9b171d697656323f8f16ff050e812483be', 'hex');

export default class CryptoUtils {
  static async encryptPayload(payload: ITokenPayload): Promise<string> {
    const cipher = crypto.createCipheriv('aes-256-gcm', secretKey, iv);
    let encrypted = cipher.update(JSON.stringify(payload), 'hex', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static async decryptPayload(encryptedPayload: string): Promise<string> {
    const decipher = crypto.createDecipheriv('aes-256-gcm', secretKey, iv);
    let decrypted = decipher.update(JSON.stringify(encryptedPayload), 'hex', 'hex');
    decrypted += decipher.final('hex');
    return decrypted;
  }
}