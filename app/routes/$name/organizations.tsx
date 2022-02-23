import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { getOrganizations } from "~/actions";
import { authenticator } from "~/services/auth.server";
import { GetOrganizations } from "../../actions";

export let loader: LoaderFunction = async ({ request }) => {
  let loggedInUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (loggedInUser && !(loggedInUser instanceof Error)) {
    return await getOrganizations({
      where: {
        owner: {
          every: {
            id: loggedInUser.id,
          },
        },
      },
    });
  }
};

export default function OrganizationsPage() {
  let data = useLoaderData<GetOrganizations>();
  return (
    <div className="flex flex-col w-full space-y-8">
      {data?.map((org) => (
        <Link to={org.name} className="flex items-center space-x-4">
          {org?.name}
        </Link>
      ))}
    </div>
  );
}
