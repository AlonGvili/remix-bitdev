import { useEffect, useState } from "react";
import {
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
} from "remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import { getScopes } from "./actions";
import CommandPalette from "./componetns/misc/comamnd_palette";
import AppBar from "./componetns/navigation/appbar";
import SideBar from "./componetns/navigation/sidebar";
import { SocketProvider } from "./context";
import { authenticator } from "./services/auth.server";
import styles from "./tailwind.css";
import { getUser } from "~/actions";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.profile?.displayName };
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  if (user && !(user instanceof Error)) {
    let scopes = await getScopes({});
    let userData = await getUser({
      where: { id: user?.id! },
    });
    return json({ data: userData, scopes }); // redirect to user's profile
  }
  return null;
};

export default function App() {
  let loaderData = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {loaderData?.data && (
          <>
            <CommandPalette scopes={loaderData?.scopes} />
            <SideBar />
            <AppBar />
          </>
        )}
        <div className="flex ml-20 mt-16 p-10">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
