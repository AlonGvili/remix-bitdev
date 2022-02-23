import { Form } from "remix";
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
import { uploadStreamToCloudinary } from "~/services/cloudinary.server";

export let action: ActionFunction = async ({ request }) => {
  const loggedinUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "avatar") {
      stream.resume();
      return;
    }

    if (!(loggedinUser instanceof Error)) {
      const uploadedImage = await uploadStreamToCloudinary(stream, {
        public_id: loggedinUser.id,
        folder: `/${loggedinUser.id}/avatars`,
      });

      return uploadedImage.secure_url;
    }
  };
  let formData = await unstable_parseMultipartFormData(request, uploadHandler);

  if (!(loggedinUser instanceof Error)) {
    let imageUrl = formData.get("avatar") as string;
    let user = await db.user.update({
      where: {
        id: loggedinUser.id,
      },
      data: {
        profile: {
          update: {
            avatar: imageUrl,
          },
        },
      },
    });
  }
  return redirect("/settings/profile");
};

export default function UserProfilePage() {
  return (
    <div className="flex flex-col space-y-8 pl-8">
      <h1 className="text-2xl">My Profile</h1>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Manage Avatar</h2>
        <Form
          className="flex flex-col items-start space-y-2"
          method="post"
          encType="multipart/form-data"
        >
          <input
            className="file:bg-violet-200 file:rounded-full file:appearance-none file:border-none file:py-1 file:px-3 file:text-sm file:text-violet-700 file:font-bold"
            id="avatar-input"
            type="file"
            name="avatar"
          />
          <button className="text-violet-400 hover:text-violet-600 font-semibold ">
            Upload new avatar
          </button>
        </Form>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Change password</h2>
        <h4>Want to change your password?</h4>
        <button className="text-violet-400 hover:text-violet-600 font-semibold ">
          Request a new one
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Transform account</h2>
        <h4>Transform your personal account to an organization account.</h4>
        <button className="text-violet-400 hover:text-violet-600 font-semibold ">
          Transform account into organization
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Delete account</h2>
        <h4>
          Removing your account will remove all of your content and data
          associated with it.{" "}
        </h4>
        <button className="text-violet-400 hover:text-violet-600 font-semibold ">
          Delete account
        </button>
      </div>
    </div>
  );
}
