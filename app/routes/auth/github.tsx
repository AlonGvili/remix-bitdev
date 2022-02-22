// app/routes/auth/github.tsx
import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = () => redirect("/login");

export let action: ActionFunction = ({ request }) => {
  return authenticator.authenticate("github", request);
};
