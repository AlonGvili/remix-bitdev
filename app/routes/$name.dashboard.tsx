import { Tab } from "@headlessui/react";
import { RiSettings3Fill } from "react-icons/ri";
import { Link, LoaderFunction, NavLink, Outlet, useLoaderData, useLocation } from "remix";
import CreateScopeButton from "~/componetns/misc/create_scope_button";
import Empty from "~/componetns/misc/empty";
import AppBar from "~/componetns/navigation/appbar";
import SideBar from "~/componetns/navigation/sidebar";
import UserInfo from "~/componetns/user/info";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
	let user = await authenticator.isAuthenticated(request, {
		failureRedirect: "/login"
	});
	if (user && !(user instanceof Error)) {
		let userData = await db?.user.findFirst({
			where: { id: user?.id! },
			include: {
				profile: true,
				scopes: {
					include: {
						packages: {
							include: {
								_count: true,
								Scope: true,
								components: true,
								tags: true,
								versions: true
							}
						}
					}
				},
				contributions: true,
				followers: true,
				following: true
			}
		});
		return userData; // redirect to user's profile
	}
	return null;
};

export default function ProfileView() {
	let data = useLoaderData();
	let location = useLocation();
	return (
		<>
			<AppBar />
			<SideBar />
			<div className="flex flex-col w-full space-y-12">
				{/* top section  */}
				<div className="flex w-full justify-between flex-1">
					<div className="flex flex-col w-2/5 space-y-4">
						<div className="flex justify-start items-center">
							<img src={data?.profile?.avatar} className="rounded-full w-24 h-24" />
							<div className="flex flex-col pl-4">
								<h3 className="text-2xl text-gray-400">{data?.profile?.displayName}</h3>
								<h1 className="text-6xl font-semibold text-violet-500">{data?.profile?.name}</h1>
							</div>
						</div>
						<UserInfo
							followers={data?.profile?.followers}
							following={data?.profile?.following}
							location={data?.profile?.location}
							homepage={data?.profile?.homepage}
						/>
					</div>
					<nav className="inline-block space-x-4">
						<Link to="/upgrade">
							<button className="py-1 text-gray-600 font-bold px-4 border rounded-md">Upgrade</button>
						</Link>
						<Link to="/edit">
							<button className="py-1 px-4 border rounded-md">Edit</button>
						</Link>
						<Link to="/settings" className="text-gray-600 font-semibold">
							<button className="py-1 px-4 border rounded-md text-center inline-flex justify-center items-center">
								<RiSettings3Fill className="text-gray-500 mr-2" />
								Settings
							</button>
						</Link>
					</nav>
				</div>

				{/* bottom section */}
				<div className="w-full">
					<Tab.Group>
						<Tab.List className="space-x-2 pb-2 border-b border-gray-200">
							<Tab>{({ selected }) => <h1 className={selected ? "text-violet-600 font-bold" : ""}>Components</h1>}</Tab>
							<Tab>{({ selected }) => <h1 className={selected ? "text-violet-600 font-bold" : ""}>Scopes</h1>}</Tab>
						</Tab.List>
						<Tab.Panels>
							<Tab.Panel>
								{data?.scopes.length < 1 ? (
									<Empty description="Create a scope to share your components" action={<CreateScopeButton />} />
								) : (
									"Components"
								)}
							</Tab.Panel>
							<Tab.Panel>Scopes</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}
