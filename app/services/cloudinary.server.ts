import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import cloudinary from "cloudinary";

export function uploadStreamToCloudinary(
  //@ts-ignore
  stream: Readable,
  options?: UploadApiOptions
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return new Promise((resolve, reject) => {
    const uploader = cloudinary.v2.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    stream.pipe(uploader);
  });
}
