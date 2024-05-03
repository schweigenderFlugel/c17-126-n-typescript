import { 
    DeleteApiResponse,
  UploadApiErrorResponse, 
  UploadApiOptions, 
  UploadApiResponse, 
  v2 as cloudinary 
} from 'cloudinary';
import { createReadStream } from 'streamifier'
import { envs } from '../config/constants';

const { CLOUDINARY_CLOUDNAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = envs;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUDNAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
})

export default class CloudinaryUtils {
  static async uploadFile(
    file: Express.Multer.File , folder: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
    const options: UploadApiOptions = {
      folder: folder,
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    }
    return new Promise<UploadApiResponse | UploadApiErrorResponse | undefined>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(options, 
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      createReadStream(file.buffer).pipe(uploadStream);
    })
  }

  static async deleteFile(
    publicId: string
  ): Promise<DeleteApiResponse | undefined> {
    return new Promise<DeleteApiResponse | undefined>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, 
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
    })
  }
}
