import React from "react";
import { RadioGroup } from "@headlessui/react";
import { RiCloseFill, RiTeamFill } from "react-icons/ri";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
  useLocation,
} from "remix";
import { authenticator } from "~/services/auth.server";
import { db } from "~/services/db.server";
import { Plan } from "@prisma/client";
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
export default function CreateOrgPage() {
  let location = useLocation();
  let actionData = useActionData<{
    error: true;
    message: string;
    fieldError: string;
    fields: {
      orgName: string;
    };
  }>();
  let [plan, setPlan] = React.useState("community");
  return (
    <div className="w-screen h-screen z-50 absolute overflow-x-hidden inset-0 bg-white">
      <div className="fixed w-full inset-0 flex justify-between items-center h-20 p-8">
        <Link to="/">
          <img
            className="w-12 h-12 object-cover"
            src="https://static.bit.dev/bit-logo.svg"
          />
        </Link>
        <Link to="/settings/organizations">
          <RiCloseFill className="w-8 h-8 text-gray-400" />
        </Link>
      </div>
      <div className="flex flex-col max-w-2xl py-24 space-y-4 mx-auto my-auto justify-items-center h-full">
        <h1 className="font-bold text-2xl">Create your organization</h1>
        <Form
          method="post"
          className="space-y-6 max-w-2xl pb-12 flex flex-col justify-between"
        >
          <input type="hidden" name="plan" value={plan} />
          <input
            name="orgName"
            defaultValue={actionData?.fields?.orgName}
            className={
              actionData?.error && actionData.fieldError === "orgName"
                ? "bg-rose-200 py-2 px-4 rounded-lg w-full placeholder:font-bold placeholder:text-lg placeholder:text-rose-600"
                : "bg-gray-100 py-2 px-4 rounded-lg w-full placeholder:font-bold placeholder:text-lg"
            }
            placeholder="Organization name"
          />
          {actionData?.error && actionData.fieldError === "orgName" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
          <h1 className="font-bold text-2xl text-gray-600">
            Choose your plan and start 30 days free
          </h1>
          <RadioGroup
            value={plan}
            onChange={setPlan}
            className="grid grid-cols-2 gap-6"
          >
            <RadioCard value="community">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 rounded-full bg-violet-600 max-w-max">
                  <RiTeamFill className="text-white text-4xl" />
                </div>
                <h1 className="font-bold text-gray-700 text-2xl">Community</h1>
                <h1 className="font-semibold text-gray-700 text-sm">
                  For open-source communities
                </h1>
                <ul
                  role="list"
                  className="marker:text-violet-500 marker:text-lg list-disc pl-5 space-y-2 text-slate-400"
                >
                  <li className="font-semibold text-sm">1 Private scope</li>
                  <li className="font-semibold text-sm">
                    Unlimited public scopes
                  </li>
                  <li className="font-semibold text-sm">Team management</li>
                  <li className="font-semibold text-sm">120 CI minutes</li>
                  <li className="font-semibold text-sm">
                    Integrations (GitHub, Slack, WebHooks)
                  </li>
                  <li className="font-semibold text-sm">Community support</li>
                </ul>
              </div>
              <div className="w-full space-y-4 text-center">
                <div className="border border-gray-200 w-full" />
                <h1>
                  <span className="font-bold text-4xl">$0</span>
                  <span className="text-xl font-bold text-gray-500">
                    /month
                  </span>
                </h1>
              </div>
            </RadioCard>
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
                  <li className="font-semibold text-sm">
                    Unlimited private scopes
                  </li>
                  <li className="font-semibold text-sm">
                    5 members included *
                  </li>
                  <li className="font-semibold text-sm">Team management</li>
                  <li className="font-semibold text-sm">
                    Autoscaling CI with 3000 minutes
                  </li>
                  <li className="font-semibold text-sm">
                    Integrations (GitHub, Slack, WebHooks)
                  </li>
                  <li className="font-semibold text-sm">
                    Private component registry
                  </li>
                  <li className="font-semibold text-sm">
                    Advanced invoice settings
                  </li>
                  <li className="font-semibold text-sm">Premium support</li>
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
          </RadioGroup>
          <p className="text-sm font-bold">
            * $15/month per additional member/collaborator.
          </p>
          <p className="text-sm font-bold">
            All plans are flexible. You can add and remove members at any time.
            Your monthly billing will update as you go. First 30 days free.
          </p>

          {plan === "business" && (
            <>
              <h1 className="font-bold text-xl">Billing information</h1>
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
                <label className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-400 font-bold">Company</p>
                  <input
                    name="company"
                    className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
                    placeholder="Company"
                  />
                  {actionData?.error && actionData.fieldError === "company" && (
                    <p className="text-rose-600 text-sm font-bold">
                      {actionData.message}
                    </p>
                  )}
                </label>
                <label className="flex flex-col space-y-2">
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
            </>
          )}
          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-md max-w-max"
          >
            Create organization
          </button>
        </Form>
      </div>
    </div>
  );
}
