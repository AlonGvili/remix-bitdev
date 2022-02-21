import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
