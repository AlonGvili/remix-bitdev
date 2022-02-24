import { RadioGroup } from "@headlessui/react";
import { Scope } from "@prisma/client";
import React from "react";
import {
  RiCloseFill,
  RiCommunityFill,
  RiGitRepositoryFill,
  RiLock2Fill,
} from "react-icons/ri";
import {
  Form,
  Link,
  ActionFunction,
  LoaderFunction,
  json,
  useLoaderData,
  redirect,
} from "remix";
import { createScope, getUser } from "~/actions";
import Input from "~/componetns/form/input";
import RadioCard from "~/componetns/misc/radio_card";
import { authenticator } from "~/services/auth.server";

export let action: ActionFunction = async ({ request }) => {
  let loggedinUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  let formData = await request.formData();
  // @ts-ignore
  let scope = Object.fromEntries(formData.entries()) as Scope;
  let newScope = await createScope({
    ...scope,
    owner: {
      connect: {
        // @ts-ignore
        id: loggedinUser.id,
      },
    },
  });
  return redirect(`/${newScope.owner?.profile?.displayName}`);
};

export let loader: LoaderFunction = async ({ request }) => {
  let loggedinUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!(loggedinUser instanceof Error)) {
    let user = await getUser({
      where: {
        id: loggedinUser.id,
      },
    });
    return json({ data: user });
  }
};

export default function CreateScopePage() {
  let { data } = useLoaderData();
  let [plan, setPlan] = React.useState("team");
  return (
    <div className="w-screen h-screen z-50 absolute inset-0 bg-white">
      <div className="fixed w-full inset-0 flex justify-between items-center h-20 p-8">
        <Link to="/">
          <img
            className="w-12 h-12 object-cover"
            src="https://static.bit.dev/bit-logo.svg"
          />
        </Link>
        <Link to="..">
          <RiCloseFill className="w-8 h-8 text-gray-400" />
        </Link>
      </div>

      <div className="flex flex-col max-w-2xl py-24 space-y-4 mx-auto my-auto justify-items-center h-full">
        <h1 className="font-bold text-2xl">
          Create a scope to host your components
        </h1>

        <h3 className="font-semibold text-lg">
          Choose “Team” to manage members and integrate with GitHub and Slack.
        </h3>

        <Form method="post" className="space-y-6 accent-violet-500">
          <fieldset className="flex space-x-8 max-w-xl w-full">
            <input
              type="hidden"
              name="owner"
              value={plan === "personal" ? data?.profile?.displayName : "team"}
            />
            <RadioGroup
              value={plan}
              onChange={setPlan}
              className="grid grid-cols-2 gap-6 w-full"
            >
              <RadioCard
                className="max-h-max flex space-x-4 p-4 items-center"
                value="team"
              >
                <div className="rounded-full flex items-center justify-center border-2 p-2 w-12 h-12 bg-violet-600">
                  <RiCommunityFill className="text-white" />
                </div>
                <span className="text-sm uppercase font-bold">team</span>
              </RadioCard>

              <RadioCard
                className="flex space-x-4 p-4 items-center"
                value="personal"
              >
                <img
                  src={data?.profile?.avatar}
                  className="object-scale-down rounded-full w-12 h-12"
                />
                <span className="text-sm uppercase font-bold">personal</span>
              </RadioCard>
            </RadioGroup>
          </fieldset>

          <Input name="name" placeholder="Scope name" />

          <Input name="description" placeholder="Scope description" />

          {/* TODO: Add a select box for license type, https://raw.githubusercontent.com/shinnn/spdx-license-ids/main/index.json */}

          <fieldset className=" space-y-6">
            <legend className="text-lg font-bold text-gray-700">
              Your bit version
            </legend>
            <div>
              <label htmlFor="v15" className="flex space-x-2 items-center">
                <input
                  id="v15"
                  type="radio"
                  name="harmony"
                  value="true"
                  className="accent-violet-500"
                />
                <div className="bg-violet-200 p-1 rounded-md text-gray-600 max-w-max px-2 text-xs font-bold">
                  v15
                </div>

                <div className="flex flex-col ">
                  <h1 className="font-bold text-gray-800">
                    Harmony | Recommended (Beta)
                  </h1>
                </div>
              </label>
              <h4 className="text-sm break-words max-w-lg pl-16 ">
                Start with Bit's next-gen to enjoy new features and a superior
                dev experience. Recommended for React and Node developers.
              </h4>
            </div>
            <div>
              <label htmlFor="v14" className="flex space-x-2 items-center">
                <input id="v14" type="radio" name="harmony" value="false" />
                <div className="bg-gray-200 p-1 accent-violet-500 rounded-md text-gray-600 max-w-max px-2 text-xs font-bold">
                  v14
                </div>

                <div className="flex flex-col ">
                  <h1 className="font-bold text-gray-800">Legacy</h1>
                </div>
              </label>
              <h4 className="text-sm break-words max-w-lg pl-16">
                Start with Bit's legacy version.
              </h4>
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <legend className="text-lg font-bold text-gray-700">Privacy</legend>
            <div>
              <label htmlFor="public" className="flex space-x-2 items-center">
                <input
                  className="accent-violet-500"
                  id="public"
                  type="radio"
                  name="privacy"
                  value="public"
                />
                <RiGitRepositoryFill className="text-gray-600" />
                <div className="flex flex-col ">
                  <h1 className="font-bold text-gray-800 pl-4">Public</h1>
                </div>
              </label>
              <h4 className="text-sm break-words max-w-lg pl-16 ">
                Share with the community.
              </h4>
            </div>
            <div>
              <label htmlFor="private" className="flex space-x-2 items-center">
                <input
                  id="private"
                  type="radio"
                  name="privacyv"
                  value="private"
                  className="accent-violet-500"
                />
                <RiLock2Fill className="text-gray-600" />
                <div className="flex flex-col ">
                  <h1 className="font-bold text-gray-800 pl-4">Privte</h1>
                </div>
              </label>
              <h4 className="text-sm break-words max-w-lg pl-16">
                Control access to this scope. Limited to 1 scope.
              </h4>
            </div>
          </fieldset>

          <button className="py-3 bg-violet-400 hover:bg-violet-600 rounded-md max-w-2xl px-6 text-white font-bold">
            Create
          </button>
        </Form>
      </div>
    </div>
  );
}
