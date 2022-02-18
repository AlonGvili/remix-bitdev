import { RiComputerFill, RiKey2Fill, RiKeyFill } from "react-icons/ri";

export default function UserAuthenticationsPage() {
	return (
		<div className="flex flex-col pl-8 min-w-full">
			<h1 className="text-2xl">Authentication</h1>
			<h2 className="text-lg ">Manage your authentication methods.</h2>
			<div className="flex flex-col space-y-2 mt-8">
				<h2 className="text-base font-semibold">Logged in Devices</h2>
				<div className="border rounded-md p-8 flex flex-col justify-center items-center py-24 space-y-4">
					<RiComputerFill className="text-4xl text-violet-600"/>
					<h1 className="text-xl font-bold">No authenticated devices</h1>
					<button className="text-violet-400 hover:text-violet-600 font-semibold ">Authenticate a device to this account.</button>
				</div>
				<h2 className="text-base font-semibold">SSH Keys</h2>
				<div className="border rounded-md p-8 flex flex-col justify-center items-center py-24 space-y-4">
					<RiKeyFill className="text-4xl text-violet-600" />
					<h1 className="text-xl font-bold">No SSH key pairs</h1>
					<button className="text-violet-400 hover:text-violet-600 font-semibold ">Configure an SSH key pair to this account.</button>
				</div>
			</div>
			<button className="bg-violet-500 hover:bg-violet-600 font-semibold text-white py-2 px-6 mt-6 rounded-md max-w-max">New</button>
		</div>
	);
}
