import { Outlet } from "remix";

export default function ScopeIndex() {
	return (
		<div className="w-full">
			<h1 className="font-bold">Package Layout</h1>
			<div className="bg-violet-500 bg-opacity-40 rounded-lg p-8 w-full">
				<h2 className="font-bold">Component Index page</h2>
				<Outlet />
			</div>
		</div>
	);
}
