import { Outlet } from "remix";

export default function ScopePage() {
	return (
		<div className="flex flex-col bg-violet-400 bg-opacity-40 rounded-lg p-8 w-full ">
			<h1 className="font-bold">Scope Page</h1>
			<div className="bg-violet-400 bg-opacity-40 rounded-lg p-8 w-full">
				<Outlet />
			</div>
		</div>
	);
}
