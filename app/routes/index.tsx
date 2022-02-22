import { useEffect } from "react";
import { LoaderFunction, redirect } from "remix";
import { useSocket } from "~/context";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (user && !(user instanceof Error)) {
    let userData = await db?.user.findFirst({
      where: { id: user?.id! },
      include: {
        profile: true,
        scopes: true,
        organizationsAdmin: true,
        contributions: true,
        followers: true,
        following: true,
      },
    });
    return userData && redirect(`/${userData.profile?.displayName}/dashboard`); // redirect to user's profile
  }
  return null;
};

// export default function Index() {
// 	const socket = useSocket();

// 	useEffect(() => {
// 		if (!socket) return;

// 		socket.on("event", (data) => {
// 			console.log(data);
// 		});

// 		socket.emit("event", "ping");
// 	}, [socket]);

// 	return (
// 		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
// 			<h1>Welcome to Remix + Socket.io</h1>
// 			<div>
// 				<button type="button" onClick={() => socket?.emit("event", "ping")}>
// 					Send ping
// 				</button>
// 			</div>
// 			<p>See Browser console and Server terminal</p>
// 		</div>
// 	);
// }
