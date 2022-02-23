import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getScopes, GetScopes } from "~/actions";
import ScopeCard from "~/componetns/cards/scope_card";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return { title: "Bit components driven development" };
};

export let loader: LoaderFunction = async ({ request }) => {
  let loggedInUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return await getScopes({});
};

export default function Scopes() {
  let data = useLoaderData<GetScopes>();
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">Scopes from the community</h1>
      <div className="grid grid-cols-6 gap-6">
        {data?.map((scope) => (
          <ScopeCard
            scope={scope}
            to={`/${scope.owner?.profile?.displayName}/scopes/${scope.id}`}
          />
        ))}
      </div>
    </div>
  );
}
