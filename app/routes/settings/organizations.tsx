import { Organization } from "@prisma/client";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { ActionFunction, Link, LoaderFunction, useLoaderData, useSubmit } from "remix";
import { authenticator } from "~/services/auth.server";
import { db } from "~/services/db.server";

export let action: ActionFunction = async ({ request }) => {
	let loggedinUser = await authenticator.isAuthenticated(request);
	let formData = await request.formData();
	let orgName = formData.get("orgName") as string;
	let action = formData.get("_action") as string;
	if (action === "delete") {
		if (!(loggedinUser instanceof Error)) {
			let currentUserProfile = await db.user.findUnique({
				where: {
					id: loggedinUser?.id!
				},
				include: {
					organizationsAdmin: true
				}
			});
			let user = await db?.user.update({
				where: {
					id: loggedinUser?.id!
				},
				data: {
					organizationsAdmin: {
						delete: {
							id: currentUserProfile?.organizationsAdmin?.find((o) => o.name === orgName)?.id
						}
					}
				}
			});
			return user;
		}
	}
	return null;
};

export let loader: LoaderFunction = async ({ request }) => {
	let loggedinUser = await authenticator.isAuthenticated(request, {
		failureRedirect: "/login"
	});
	if (!(loggedinUser instanceof Error)) {
		let user = await db.user.findUnique({
			where: {
				id: loggedinUser?.id!
			},
			include: {
				contributions: true,
				profile: true,
				organizationsAdmin: true,
				scopes: {
					include: {
						collaborators: true,
						packages: true
					}
				}
			}
		});
		return user;
	}
	return null;
};

export default function UserOrganizationsPage() {
	let data = useLoaderData();
	return (
		<div className="flex flex-col space-y-8 pl-8 w-full">
			<h1 className="text-2xl">Organizations</h1>
			<div className="flex flex-col space-y-2">
				{data?.organizationsAdmin?.map((organization: Organization) => {
					return (
						<div className="flex w-full border border-gray-200 justify-between items-center p-4 rounded-lg">
							<h1 className="font-bold text-gray-600 uppercase">{organization?.name}</h1>
							<div className="space-x-4 flex items-center">
								<h3 className="font-bold text-gray-400 lowercase">{organization.plan}</h3>
								<h4 className="font-bold text-gray-400">Admin</h4>
								<DeleteOrgButton orgName={organization.name} />
							</div>
						</div>
					);
				})}
			</div>
			<Link to="/create-org" className="max-w-max">
				<button className="py-3 px-6 max-w-max w-full bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-md">
					Create organizations
				</button>
			</Link>
		</div>
	);
}

function DeleteOrgButton({ orgName }: { orgName: string }) {
	let submit = useSubmit();
	return (
		<button onClick={() => submit({ _action: "delete", orgName: orgName }, { action: "/settings/organizations", method: "post" })}>
			<RiDeleteBin7Fill className="text-gray-400 hover:text-gray-600" />
		</button>
	);
}
