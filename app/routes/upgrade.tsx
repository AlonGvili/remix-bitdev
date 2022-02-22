import React from "react";
import { RadioGroup } from "@headlessui/react";
import {
  RiCloseFill,
  RiTeamFill,
  RiUser6Fill,
  RiUserFill,
} from "react-icons/ri";
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useActionData,
  useLocation,
  useLoaderData,
  Links,
} from "remix";
import { authenticator } from "~/services/auth.server";
import { db } from "~/services/db.server";
import { Plan, Profile, User } from "@prisma/client";
import RadioCard from "~/componetns/misc/radio_card";

export let action: ActionFunction = async ({ request }) => {
  let loggedinUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let formData = await request.formData();
  let orgName = formData.get("orgName") as string;
  let plan = formData.get("plan") as string;
  let fields = Object.fromEntries(formData.entries());
  if (!orgName) {
    return {
      fields,
      fieldError: "orgName",
      message: "Please enter an organization name",
      error: true,
    };
  }

  if (plan === "community") {
    if (!(loggedinUser instanceof Error)) {
      let org = await db.organization.create({
        data: {
          plan: Plan.COMMUNITY,
          name: orgName,
          owner: {
            connect: {
              id: loggedinUser?.id!,
            },
          },
        },
      });
      return redirect(`/settings/organizations`);
    }
  }
  if (plan === "business") {
    if (!fields.firstName) {
      return {
        fields,
        fieldError: "firstName",
        message: "Please enter your first name",
        error: true,
      };
    }
    if (!fields.lastName) {
      return {
        fields,
        fieldError: "lastName",
        message: "Please enter your last name",
        error: true,
      };
    }
    if (!fields.company) {
      return {
        fields,
        fieldError: "company",
        message: "Please enter your company name",
        error: true,
      };
    }
    if (!fields.phone) {
      return {
        fields,
        fieldError: "phone",
        message: "Please enter your phone number",
        error: true,
      };
    }
    if (!fields.creditCardNumber) {
      return {
        fields,
        fieldError: "creditCardNumber",
        message: "Please enter your credit card number",
        error: true,
      };
    }
    if (!fields.creditCardDate) {
      return {
        fields,
        fieldError: "creditCardDate",
        message: "Please enter your credit card expiration date",
        error: true,
      };
    }
    if (!fields.creditCardCcv) {
      return {
        fields,
        fieldError: "creditCardCcv",
        message: "Please enter your credit card ccv",
        error: true,
      };
    }
    if (!(loggedinUser instanceof Error)) {
      let org = await db.organization.create({
        data: {
          plan: Plan.BUSINESS,
          name: orgName,
          owner: {
            connect: {
              id: loggedinUser?.id!,
            },
          },
        },
      });
      return redirect(`/settings/organizations`);
    }
  }
  return null;
};

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

export default function UpgradePage() {
  let location = useLocation();
  let loaderData = useLoaderData<
    | (User & {
        profile: Profile | null;
      })
    | null
  >();
  let actionData = useActionData<{
    error: true;
    message: string;
    fieldError: string;
    fields: {
      orgName: string;
    };
  }>();
  let [action, setAction] = React.useState("transfer");
  let [plan, setPlan] = React.useState("business");
  return (
    <div className="w-screen h-screen z-50 absolute overflow-x-hidden inset-0 bg-white">
      <div className="fixed w-full inset-0 flex justify-between items-center h-20 p-8">
        <Link to="/">
          <img
            className="w-12 h-12 object-cover"
            src="https://static.bit.dev/bit-logo.svg"
          />
        </Link>
        <Link to="/">
          <RiCloseFill className="w-8 h-8 text-gray-400" />
        </Link>
      </div>
      <div className="flex flex-col max-w-2xl py-24 space-y-4 mx-auto my-auto justify-items-center h-full">
        <Form
          method="post"
          className="space-y-8 max-w-2xl pb-12 flex flex-col justify-between"
        >
          <h3 className="text-base font-bold text-gray-300">Step 1 of 3</h3>
          <h1 className="font-bold text-3xl text-gray-600">
            Upgrade your plan and start 30 days free
          </h1>
          <RadioGroup
            value={plan}
            onChange={setPlan}
            className="grid grid-cols-2 gap-6"
          >
            <RadioCard value="business">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-violet-600 max-w-max">
                  <RiTeamFill className="text-white text-4xl" />
                </div>
                <h1 className="font-bold text-gray-700 text-2xl">Business</h1>
                <h1 className="font-semibold text-gray-700 text-sm">
                  For teams building modern apps
                </h1>
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
              <div className="w-full space-y-4 text-center">
                <div className="border border-gray-200 w-full" />
                <h1>
                  <span className="font-bold text-4xl">$200</span>
                  <span className="text-xl font-bold text-gray-500">
                    /month
                  </span>
                </h1>
              </div>
            </RadioCard>
            <RadioCard value="pro">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-gray-800 max-w-max">
                  <RiUser6Fill className="text-white text-4xl" />
                </div>
                <h1 className="font-bold text-gray-700 text-2xl">Pro</h1>
                <h1 className="font-semibold text-gray-700 text-sm">
                  For developers building small apps
                </h1>
                <ul
                  role="list"
                  className="marker:text-gray-800 marker:text-lg list-disc pl-5 space-y-2 text-slate-400"
                >
                  <li className="font-semibold text-sm text-gray-800">
                    Unlimited private scopes
                  </li>
                  <li className="font-semibold text-sm text-gray-800">
                    Add collaborators *
                  </li>
                  <li className="font-semibold text-sm text-gray-800">
                    Autoscaling CI with 300 minutes
                  </li>
                </ul>
              </div>
              <div className="w-full space-y-4 text-center">
                <div className="border border-gray-200 w-full" />
                <h1>
                  <span className="font-bold text-4xl">$35</span>
                  <span className="text-xl font-bold text-gray-500">
                    /month
                  </span>
                </h1>
              </div>
            </RadioCard>
          </RadioGroup>
          <div className="text-center space-y-4">
            <p className="text-sm font-bold">
              * $15/month per additional member/collaborator.
            </p>
            <p className="text-sm font-bold">
              All plans are flexible. You can add and remove members at any
              time. Your monthly billing will update as you go. First 30 days
              free.
            </p>
          </div>

          {plan === "business" && (
            <>
              <h1 className="font-bold text-lg">Pick an action</h1>
              <RadioGroup
                value={action}
                onChange={setAction}
                className="grid grid-cols-2 gap-4"
              >
                <RadioCard
                  value="transfer"
                  className="flex items-start flex-col p-8 space-y-4"
                >
                  <h1 className="text-left font-bold text-base">
                    Transform account
                  </h1>
                  <p className="text-sm font-semibold">
                    Transform your account to an organization account to keep
                    your current component paths and collaborators.
                  </p>
                </RadioCard>
                <RadioCard
                  value="create"
                  className="flex items-start flex-col p-8 space-y-4"
                >
                  <h1 className="text-left font-bold text-base">Create Team</h1>
                  <p className="text-sm font-semibold">
                    Create new organization so you can gradually move your
                    components and add team members
                  </p>
                </RadioCard>
              </RadioGroup>
              <Link
                to={`/${loaderData?.profile?.displayName}/migrate-confirmation`}
              >
                <button
                  type="button"
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-5 rounded-md max-w-max"
                >
                  Next
                </button>
              </Link>
            </>
          )}
          {plan === "pro" && (
            <>
              <h1 className="font-bold text-xl">Billing information</h1>
              <div className="flex items-center space-x-2">
                {loaderData?.profile?.avatar && (
                  <img
                    src={loaderData?.profile?.avatar}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                )}
                <div>
                  <p className="text-gray-700 text-sm font-bold">
                    {loaderData?.profile?.name}
                  </p>
                  <p className="text-gray-700 text-sm font-bold">
                    Personal account
                  </p>
                </div>
              </div>
              <fieldset className="grid grid-cols-2 gap-4">
                <label className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-400 font-bold">First name</p>
                  <input
                    name="firstName"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="First name"
                  />
                  {actionData?.error &&
                    actionData.fieldError === "firstName" && (
                      <p className="text-rose-600 text-sm font-bold">
                        {actionData.message}
                      </p>
                    )}
                </label>
                <label className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-400 font-bold">Last name</p>
                  <input
                    name="lastName"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="Last name"
                  />
                  {actionData?.error &&
                    actionData.fieldError === "lastName" && (
                      <p className="text-rose-600 text-sm font-bold">
                        {actionData.message}
                      </p>
                    )}
                </label>
                <label className="flex flex-col space-y-2 col-span-full">
                  <p className="text-sm text-gray-400 font-bold">Phone</p>
                  <input
                    name="phone"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="Phone"
                  />
                  {actionData?.error && actionData.fieldError === "phone" && (
                    <p className="text-rose-600 text-sm font-bold">
                      {actionData.message}
                    </p>
                  )}
                </label>
                <label className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-400 font-bold">
                    Billing email
                  </p>
                  <input
                    name="billingEmail"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="Billing email"
                  />
                  {actionData?.error &&
                    actionData.fieldError === "billingEmail" && (
                      <p className="text-rose-600 text-sm font-bold">
                        {actionData.message}
                      </p>
                    )}
                </label>
                <label className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-400 font-bold">Country</p>
                  <input
                    name="country"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="Country"
                  />
                  {actionData?.error && actionData.fieldError === "country" && (
                    <p className="text-rose-600 text-sm font-bold">
                      {actionData.message}
                    </p>
                  )}
                </label>
              </fieldset>
              <fieldset className="grid grid-cols-2 gap-4">
                <label className="font-bold text-sm">
                  Credit card information
                </label>
                <input
                  name="creditCardNumber"
                  className="bg-gray-100 py-2 px-6 rounded-md col-span-full placeholder:font-bold placeholder:text-gray-400"
                  placeholder="1234 5678 9012 3456"
                />
                {actionData?.error &&
                  actionData.fieldError === "creditCardNumber" && (
                    <p className="text-rose-600 text-sm font-bold col-span-full">
                      {actionData.message}
                    </p>
                  )}
                <label className="flex flex-col space-y-2">
                  <input
                    name="creditCardDate"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="MM/YY"
                  />
                  {actionData?.error &&
                    actionData.fieldError === "creditCardDate" && (
                      <p className="text-rose-600 text-sm font-bold">
                        {actionData.message}
                      </p>
                    )}
                </label>
                <label className="flex flex-col space-y-2">
                  <input
                    name="creditCardCcv"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="CCV"
                  />
                  {actionData?.error &&
                    actionData.fieldError === "creditCardCcv" && (
                      <p className="text-rose-600 text-sm font-bold">
                        {actionData.message}
                      </p>
                    )}
                </label>
              </fieldset>
              <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-5 rounded-md max-w-max"
              >
                Submit
              </button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
