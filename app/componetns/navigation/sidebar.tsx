import { RiFoldersLine, RiFunctionLine } from "react-icons/ri";
import { NavLink } from "remix";

export default function SideBar() {
	return (
		<nav className="h-screen fixed inset-0 w-20 bg-white z-50 border border-r border-gray-100">
			<ul className="space-y-8 flex flex-col py-12 items-center px-2 w-full mx-auto">
				<li>
					<NavLink to="/components" className={({ isActive }) => (isActive ? "text-violet-500" : "text-gray-200")}>
						<RiFunctionLine className="w-6 h-6"/>
					</NavLink>
				</li>
				<li>
					<NavLink to="/scopes" className={({ isActive }) => (isActive ? "text-violet-500" : "text-gray-200")}>
						<RiFoldersLine className="w-6 h-6"/>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
