import { RiCloseFill, RiErrorWarningFill, RiTeamFill } from "react-icons/ri";
import { Link, Form, useLoaderData, LoaderFunction } from "remix";
import { Profile, User, Organization } from "@prisma/client";
import { authenticator } from "~/services/auth.server";
import PageHeader from "~/componetns/misc/page_header";
import Input from "~/componetns/form/input";
import BillingInfo from "~/componetns/misc/billing_info";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (user && !(user instanceof Error)) {
    let userData = await db?.user.findFirst({
      where: { id: user?.id! },
      include: {
        profile: true,
      },
    });
    return userData;
  }
  return null;
};

export default function MigrateConfirmationPage() {
  let loaderData = useLoaderData<
    | (User & {
        profile: Profile | null;
      })
    | null
  >();
  return (
    <div className="w-screen h-screen z-50 absolute overflow-x-hidden inset-0 bg-white">
      <PageHeader to="/upgrade" />
      <div className="flex flex-col max-w-2xl py-24 space-y-4 mx-auto my-auto justify-items-center h-full">
        <Form
          method="post"
          className="space-y-8 max-w-4xl pb-12 flex flex-col justify-between"
        >
          <h3 className="text-base font-bold text-gray-300">Step 3 of 3</h3>
          <h1 className="font-bold text-3xl text-gray-600">
            Transform your account to an organization account
          </h1>

          {/* Organization name */}
          <Input
            label="Organization name"
            name="orgName"
            placeholder="Organization name"
            defaultValue={loaderData?.profile?.displayName!}
          />

          {/* New personal account name */}
          <Input
            label="Pick a new personal account name"
            name="orgName"
            placeholder="Enter new user name"
          />

          <ul
            role="list"
            className="marker:text-violet-500 marker:text-lg list-disc pl-5 space-y-2 text-slate-400"
          >
            <li className="font-semibold text-base text-gray-800">
              All administrative privileges will be bestowed upon this account.
            </li>
            <li className="font-semibold text-base text-gray-800">
              New account keeps current user specific information like emails,
              tokens and passwords.
            </li>
          </ul>
          <div className="p-3 flex space-x-4 items-center rounded-lg border-2 border-violet-600">
            <div className="grid grid-cols-2 p-4 gap-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-violet-600 max-w-max">
                  <RiTeamFill className="text-white text-4xl" />
                </div>
                <h1 className="font-bold text-gray-700 text-2xl">Business</h1>
                <h1 className="font-semibold text-gray-700 text-sm">
                  For teams building modern apps
                </h1>
                <div className="w-full space-y-4 text-center">
                  <h1>
                    <span className="font-bold text-4xl">$200</span>
                  </h1>
                </div>
              </div>
              <ul
                role="list"
                className="marker:text-violet-500 marker:text-lg list-disc pl-5 space-y-2 text-slate-400"
              >
                <li className="font-semibold text-sm text-gray-800">
                  Unlimited private scopes
                </li>
                <li className="font-semibold text-sm text-gray-800">
                  5 members included *
                </li>
                <li className="font-semibold text-sm text-gray-800">
                  Team management
                </li>
                <li className="font-semibold text-sm text-gray-800">
                  Autoscaling CI with 3000 minutes
                </li>
                <li className="font-semibold text-sm text-gray-800">
                  Integrations (GitHub, Slack, WebHooks)
                </li>
                <li className="font-semibold text-sm text-gray-800">
                  Private component registry
                </li>
                <li className="font-semibold text-sm text-gray-800">
                  Advanced invoice settings
                </li>
                <li className="font-semibold text-sm text-gray-800">
                  Premium support
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-gray-400 text-center font-semibold">
            All plans are flexible. You can add and remove members at any time.
            Your monthly billing will update as you go, based on the number of
            members. First 30 days free.
          </h3>
          <h1 className="text-center text-xl font-bold">Billing information</h1>
          <BillingInfo buttonLabel="Transform" />
        </Form>
      </div>
    </div>
  );
}
