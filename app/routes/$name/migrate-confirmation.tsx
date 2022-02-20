import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { Link, Form, useLoaderData, LoaderFunction } from "remix";
import { Profile, User } from '@prisma/client';
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
	let user = await authenticator.isAuthenticated(request, {
		failureRedirect: "/login"
	});
	if (user && !(user instanceof Error)) {
		let userData = await db?.user.findFirst({
			where: { id: user?.id! },
			include: {
				profile: true
			}
		});
		return userData;
	}
	return null;
};

export default function MigrateConfirmationPage() {
    let loaderData = useLoaderData<
    | (User & {
            profile: Profile | null;
      })
    | null
>();
	return (
		<div className="w-screen h-screen z-50 absolute overflow-x-hidden inset-0 bg-white">
			<div className="fixed w-full inset-0 flex justify-between items-center h-20 p-8">
				<Link to="/">
					<img className="w-12 h-12 object-cover" src="https://static.bit.dev/bit-logo.svg" />
				</Link>
				<Link to="/">
					<RiCloseFill className="w-8 h-8 text-gray-400" />
				</Link>
			</div>
			<div className="flex flex-col max-w-2xl py-24 space-y-4 mx-auto my-auto justify-items-center h-full">
				<Form method="post" className="space-y-4 max-w-2xl pb-12 flex flex-col justify-between">
					<h3 className="text-base font-bold text-gray-300">Step 2 of 3</h3>
					<h1 className="font-bold text-3xl text-gray-600">Account transformation warning</h1>
					<h1 className="font-bold text-lg text-gray-600">What you are about to do is an irreversible process. Please be aware.</h1>
					<div className="bg-rose-200 p-3 flex space-x-4 items-center rounded-lg">
						<RiErrorWarningFill className="text-rose-600 w-6 h-6" />
						<h1 className="font-bold text-md text-rose-600">Warning - this action cannot be undone!</h1>
					</div>

					<ul role="list" className="space-y-4 text-slate-400">
						<li className=" text-base font-semibold text-gray-800">{loaderData?.profile?.displayName} will be the name of the organization.</li>
						<li className=" text-base font-semibold text-gray-800">You will not be able to sign-in to {loaderData?.profile?.displayName}</li>
						<li className=" text-base font-semibold text-gray-800">
							The total amount of collaborators across scope will be the members for the organization.
						</li>
						<li className=" text-base font-semibold text-gray-800">
							The transform process requires you to select a username for a new personal account.
						</li>
						<li className=" text-base font-semibold text-gray-800">
							All administrative privileges will be bestowed the new personal account.
						</li>
						<li className=" text-base font-semibold text-gray-800">
							Any user specific information (emails, tokens, passwords, etc) will move to a new account-name.
						</li>
					</ul>
				</Form>
				<div className="flex justify-between items-center">
					<Link to="/upgrade">
						<p className="font-semibold">Back</p>
					</Link>
                    <Link to={`/${loaderData?.profile?.displayName}/migration`}>
					<button type="button" className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-6 rounded-md max-w-max">
						Transform {loaderData?.profile?.displayName} into an organization
					</button>
                    </Link>
				</div>
			</div>
		</div>
	);
}
