import {
  ActionFunction,
  unstable_parseMultipartFormData,
  UploadHandler,
} from "remix";
import type {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  UploadStream,
} from "cloudinary";
import cloudinary from "cloudinary";
import { authenticator } from "~/services/auth.server";
import { redirect } from "remix";
import { db } from "~/services/db.server";

// cloudinary.config({
//   cloud_name: "alongvili",
//   api_key: "668883752359446",
//   api_secret: "9fAY3c5xqD7ztDfN4ACKmXUU4gM",
// });

// export let action: ActionFunction = async ({ request }) => {
//   const loggedinUser = await authenticator.isAuthenticated(request, {
//     failureRedirect: "/login",
//   });

//   function uploadStreamToCloudinary(
//     stream: Readable,
//     options?: UploadApiOptions
//   ): Promise<UploadApiResponse | UploadApiErrorResponse> {
//     return new Promise((resolve, reject) => {
//       const uploader = cloudinary.v2.uploader.upload_stream(
//         options,
//         (error, result) => {
//           if (result) {
//             resolve(result);
//           } else {
//             reject(error);
//           }
//         }
//       );

//       stream.pipe(uploader);
//     });
//   }

//   let uploadHandler: UploadHandler = async ({ name, stream }) => {
//     // we only care about the file form field called "avatar"
//     // so we'll ignore anything else
//     // NOTE: the way our form is set up, we shouldn't get any other fields,
//     // but this is good defensive programming in case someone tries to hit our
//     // action directly via curl or something weird like that.
//     if (name !== "avatar") {
//       stream.resume();
//       return;
//     }

//     const uploadedImage = await uploadStreamToCloudinary(stream, {
//       public_id: loggedinUser.id,
//       folder: `/${loggedinUser.id}/avatars`,
//     });

//     return uploadedImage.secure_url;
//   };

//   let formData = await unstable_parseMultipartFormData(request, uploadHandler);

//   let imageUrl = formData.get("avatar") as string;
//   console.log(imageUrl);
//   await db.user.update({
//     where: {
//       id: loggedinUser.id,
//     },
//     data: {
//       profile: {
//         update: {
//           avatar: imageUrl,
//         },
//       },
//     },
//   });
//   return redirect("/settings/profile");
//   // because our uploadHandler returns a string, that's what the imageUrl will be.
//   // ... etc
// };

// import {
//   ActionFunction,
//   unstable_createFileUploadHandler,
//   unstable_createMemoryUploadHandler,
//   unstable_parseMultipartFormData,
// } from "remix";

// const uploadHandler = unstable_createMemoryUploadHandler({});

// function decoder(encoding: string) {
//   const buff = Buffer.from(encoding, "base64");

//   // decode buffer as UTF-8
//   const str = buff.toString("utf-8");
//   return str;
// }

// export let action: ActionFunction = async ({ request }) => {
//   const formData = await unstable_parseMultipartFormData(
//     request,
//     uploadHandler
//   );
//   const uploaded = formData.get("file");
//   let file = uploaded;
//   const base64 = Buffer.from(await (uploaded as File).arrayBuffer()).toString(
//     "base64"
//   );

//   const decoded = decoder(base64);
//   return decoded;
// };
