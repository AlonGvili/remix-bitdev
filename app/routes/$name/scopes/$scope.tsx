import { LoaderFunction, useLoaderData } from "remix";
import { GetScope, getScope } from "~/actions";
import { authenticator } from "~/services/auth.server";
import { RiEarthFill } from "react-icons/ri";

export let loader: LoaderFunction = async ({ request, params }) => {
  let loggedInUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return await getScope({
    where: {
      id: params.scope,
    },
  });
};

export default function ScopePage() {
  let data = useLoaderData<GetScope>();
  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="flex items-center space-x-4">
        <div className="uppercase w-12 h-12 rounded-full flex justify-center items-center bg-violet-300 text-violet-600 font-bold">
          {data?.name.substring(0, 2)}
        </div>
        <h1 className="font-bold text-xl">{data?.name}</h1>
      </div>
      <div className="flex flex-col justify-center space-y-4">
        <h3 className="font-semibold text-gray-400 text-base">
          {data?.description}
        </h3>
        <div className="flex space-x-2 items-center">
          <RiEarthFill className="font-normal text-sm text-gray-600" />
          <h3 className="text-xs font-bold text-gray-600">{data?.privacy}</h3>
        </div>
      </div>
      <div className="rounded-lg p-8 w-full">
        {data?.components.map((component) => (
          <h1>sdfsfsd</h1>
        ))}
      </div>
    </div>
  );
}
