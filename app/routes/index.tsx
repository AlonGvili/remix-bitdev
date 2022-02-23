import { LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";
import { getUser } from "~/actions";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (user && !(user instanceof Error)) {
    let userData = await getUser({
      where: { id: user.id },
    });
    return userData && redirect(`/${userData.profile?.displayName}`); // redirect to user's profile
  }
  return null;
};
