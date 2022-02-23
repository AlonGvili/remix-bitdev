import { LoaderFunction, useLoaderData, useParams } from "remix";
import { GetOrganization, getOrganization } from "~/actions";
import { authenticator } from "~/services/auth.server";
import ScopeCard from "../../../componetns/cards/scope_card";

export let loader: LoaderFunction = async ({ request, params }) => {
  let loggedInUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (loggedInUser && !(loggedInUser instanceof Error)) {
    return await getOrganization({
      where: {
        name: params.name,
      },
    });
  }
};

export default function OrganizationPage() {
  let data = useLoaderData<GetOrganization>();
  return (
    <div className="flex flex-col w-full">
      <div className="flex space-x-4 items-center">
        <div>
          {data?.avatar ? (
            <img src={data?.avatar} />
          ) : (
            <div className="flex items-center justify-center uppercase bg-violet-200 text-violet-700 font-bold p-4 max-w-max rounded-full h-12 w-12">
              {data?.name.substring(0, 2)}
            </div>
          )}
        </div>
        <h1 className="font-bold text-2xl capitalize">{data?.name}</h1>
      </div>
      {data?.scopes?.map((scope) => (
        <ScopeCard scope={scope} to={scope?.name} />
      ))}
    </div>
  );
}
