import { diskStorage, memoryStorage } from "multer";
import { extname } from 'node:path'
import { IUser } from "../interfaces/user.interface";

export default class MulterUtils {
  static async localStorage(localFolder: string, formats: string[]) {
    diskStorage({
      destination: (req, file, cb) => {
        cb(null, `uploads/${localFolder}`);
      },
      filename: (req, file, cb) => {
        const user = req as unknown as IUser;
        const ext = extname(file.originalname);
        const filename = `${user.name}-${user.lastname}${ext}`;
        cb(null, filename);
      }
    })
  }

  static async buffer(formats: string[]) {
    memoryStorage()
  }
}