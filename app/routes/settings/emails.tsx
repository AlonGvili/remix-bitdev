import { RiDeleteBin7Fill } from "react-icons/ri";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useLoaderData,
  useLocation,
  useSubmit,
} from "remix";
import { authenticator } from "~/services/auth.server";
import { db } from "~/services/db.server";

export let action: ActionFunction = async ({ request }) => {
  let loggedinUser = await authenticator.isAuthenticated(request);
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let action = formData.get("_action") as string;
  if (action === "makePrimary") {
    if (!(loggedinUser instanceof Error)) {
      let user = await db?.user.update({
        where: {
          id: loggedinUser?.id!,
        },
        data: {
          profile: {
            update: {
              primaryEmail: email,
            },
          },
        },
      });
      return user;
    }
  }
  if (action === "delete") {
    if (!(loggedinUser instanceof Error)) {
      let currentUserProfile = await db.user.findUnique({
        where: {
          id: loggedinUser?.id!,
        },
        include: {
          profile: true,
        },
      });
      let emails = currentUserProfile?.profile?.emails.filter(
        (e) => e !== email
      );
      let user = await db?.user.update({
        where: {
          id: loggedinUser?.id!,
        },
        data: {
          profile: {
            update: {
              emails: emails,
            },
          },
        },
      });
      return user;
    }
  }
  if (action === "add") {
    if (!(loggedinUser instanceof Error)) {
      let user = await db?.user.update({
        where: {
          id: loggedinUser?.id!,
        },
        data: {
          profile: {
            update: {
              emails: {
                push: email,
              },
            },
          },
        },
      });
      return user;
    }
  }
  return null;
};

export let loader: LoaderFunction = async ({ request }) => {
  let loggedinUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!(loggedinUser instanceof Error)) {
    let user = await db.user.findUnique({
      where: {
        id: loggedinUser?.id!,
      },
      include: {
        contributions: true,
        profile: true,
        scopes: {
          include: {
            collaborators: true,
            packages: true,
          },
        },
      },
    });
    return user;
  }
  return null;
};
export default function UserEmailsPage() {
  let data = useLoaderData();
  let location = useLocation();
  return (
    <div className="flex flex-col pl-8 min-w-full">
      <h1 className="text-2xl">Email Addresses</h1>
      <h2 className="text-lg ">Manage your email addresses</h2>
      <div className="space-y-8">
        <Form method="post" className="flex space-x-4" key={location.key}>
          <input
            name="email"
            className="w-full bg-gray-100 text-gray-600 placeholder:text-gray-400 placeholder:font-bold rounded-md px-4 py-3"
            placeholder="you@your.domain"
          />
          <button
            name="_action"
            value="add"
            type="submit"
            className="bg-violet-400 hover:bg-violet-600 text-white font-bold px-8 py-2 rounded-md max-wmax"
          >
            Add
          </button>
        </Form>
        <div className="space-y-2">
          <h3 className="text-base font-bold">Your email addresses</h3>
          <div className="w-full border-2 border-violet-600 flex justify-between py-3 px-4 rounded-md">
            <span className="font-semibold">{data?.profile?.primaryEmail}</span>
            <span className="font-bold text-gray-500">Primary Email</span>
          </div>
          <div className="flex flex-col">
            <Form id="delete" method="post" />
            <Form id="makePrimary" method="post" />
            {data?.profile?.emails?.map((email: string, index: number) => {
              return (
                <div
                  className="flex justify-between p-4"
                  key={`${email}-${index}`}
                >
                  <p className="font-semibold">{email}</p>
                  <div className="flex items-center space-x-4">
                    <input type="hidden" defaultValue={email} name="email" />
                    <MakePrimaryEmailButton email={email} />
                    <DeleteEmailButton email={email} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteEmailButton({ email }: { email: string }) {
  let submit = useSubmit();
  return (
    <button
      onClick={() =>
        submit(
          { _action: "delete", email: email },
          { action: "/settings/emails", method: "post" }
        )
      }
    >
      <RiDeleteBin7Fill className="text-gray-400 hover:text-gray-600" />
    </button>
  );
}

function MakePrimaryEmailButton({ email }: { email: string }) {
  let submit = useSubmit();
  return (
    <button
      onClick={() =>
        submit(
          { _action: "makePrimary", email: email },
          { action: "/settings/emails", method: "post" }
        )
      }
      className="text-gray-600 hover:text-violet-600 font-semibold decoration-gray-600 underline hover:decoration-violet-500"
    >
      Make Primary
    </button>
  );
}
