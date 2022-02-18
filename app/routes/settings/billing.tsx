import { Disclosure } from "@headlessui/react";
import { RiArrowDownSFill } from "react-icons/ri";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
	let loggedinUser = await authenticator.isAuthenticated(request, {
		failureRedirect: "/login"
	});

	return null;
};

export default function UserBillingPage() {
	return (
		<div className="flex flex-col space-y-8 pl-16 w-full">
			<h1 className="text-2xl">Billing</h1>
			<div className="flex space-x-12 max-w-2xl">
				<div className="bg-gray-100 w-48 h-44 p-6 flex flex-col items-center justify-evenly rounded-lg aspect-square">
					<h1 className="text-sm font-bold">Plan</h1>
					<span className="text-violet-500 font-bold text-2xl">Free</span>
				</div>
				<div className="bg-gray-100 w-48 h-44 p-6 flex flex-col items-center justify-evenly rounded-lg  aspect-square">
					<h1 className="text-sm font-bold">Current monthly bill</h1>
					<span className="text-lg font-bold">-</span>
				</div>
				<div className="bg-gray-100 w-48 h-44 p-6 flex flex-col items-center justify-evenly rounded-lg aspect-square">
					<h1 className="text-sm font-bold">Next payment due</h1>
					<span className="text-lg font-bold">-</span>
				</div>
			</div>
			<div className="max-w-2xl border border-gray-300 p-2 rounded-md flex items-center justify-between">
				<h1 className="text-base pl-4 font-bold text-gray-600">Go Pro to collaborate on private code</h1>
				<button className="py-2 px-6 max-w-max w-full bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-md">Upgrade</button>
			</div>
			<div className="max-w-full">
				<div className="flex flex-col space-y-6 items-start max-w-2xl">
					<h1 className="py-2 font-semibold text-2xl">Billing details</h1>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="py-2 font-semibold text-sm max-w-2xl w-full flex items-center justify-between">
									Free Subscription
									{!open ? <RiArrowDownSFill /> : <RiArrowDownSFill className="rotate-180" />}
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 max-w-max">For personal hobby and open source</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="py-2 font-semibold text-sm max-w-2xl w-full flex items-center justify-between">
									Members
									{!open ? <RiArrowDownSFill /> : <RiArrowDownSFill className="rotate-180" />}
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 w-full">
									<ul className="space-y-4 w-full ">
										<li className="flex justify-between">
											<span>Current:</span>
											<span className="text-violet-600 font-bold">0</span>
										</li>
										<li className=" w-full flex justify-between">
											<span>Cost Per Member:</span>
											<span className="text-violet-600 font-bold">$0</span>
										</li>
									</ul>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="py-2 font-semibold text-sm max-w-2xl w-full flex items-center justify-between">
									Component CI Minutes
									{!open ? <RiArrowDownSFill /> : <RiArrowDownSFill className="rotate-180" />}
								</Disclosure.Button>
								<Disclosure.Panel className="text-gray-500 max-w-max">
									Currently the system does not enforce a limit on monthly CI minutes.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</div>
		</div>
	);
}
