import { useEffect, useState } from "react";
import { LoaderFunction, MetaFunction, redirect } from "remix";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import AppBar from "./componetns/navigation/appbar";
import SideBar from "./componetns/navigation/sidebar";
import { SocketProvider } from "./context";
import { authenticator } from "./services/auth.server";
import styles from "./tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
	return { title: "New Remix App" };
};

export let loader: LoaderFunction = async ({ request }) => {
	let user = await authenticator.isAuthenticated(request);
	if (user && !(user instanceof Error)) {
		let userData = await db?.user.findFirst({ where: { id: user?.id! },include:{
			profile: true,
			scopes: true,
			contributions: true,
			followers: true,
			following: true,
		} });
		return userData  // redirect to user's profile
	}
	return null
};

export default function App() {
	// const [socket, setSocket] = useState<Socket>();

	// useEffect(() => {
	// 	const socket = io();
	// 	setSocket(socket);
	// 	return () => {
	// 		socket.close();
	// 	};
	// }, []);

	// useEffect(() => {
	// 	if (!socket) return;
	// 	socket.on("confirmation", (data) => {
	// 		console.log(data);
	// 	});
	// }, [socket]);

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{/* <SocketProvider socket={socket}> */}
				<SideBar />
				<AppBar />
				<div className="flex ml-20 mt-16 p-10">
					<Outlet />
				</div>
				{/* </SocketProvider> */}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
