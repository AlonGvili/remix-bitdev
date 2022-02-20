import { RiFoldersLine, RiFunctionLine } from "react-icons/ri";
import { NavLink, Form, useLoaderData, Link } from 'remix';

export default function AppBar() {
    let data = useLoaderData()
	return (
		<nav className="w-screen fixed inset-0 left-20 pr-24 h-16 bg-white z-30 border border-b border-gray-100">
			<div className="flex py-2 items-center px-2 w-full h-full justify-between">
				<Form className="w-4/12">
					<input
						type="text"
						className="w-full h-full max-w-xs py-2 px-4 bg-gray-200 rounded-md text-gray-600"
						name="q"
						placeholder="Search"
					/>
				</Form>
				<div className="space-x-8 flex justify-center items-center">
					<NavLink to="#" className="text-gray-500">
						Learn
					</NavLink>
					<NavLink to="#" className="text-gray-500">
						Platform
					</NavLink>
					<NavLink to="#" className="text-gray-500">
						Pricing
					</NavLink>
					<NavLink to="#" className="text-gray-500">
						Enterprise
					</NavLink>
                    <button className="max-w-max py-1 px-6 bg-violet-500 text-white rounded-md">+New</button>
                    <Link to={`/${data?.profile?.displayName}/dashboard`}>
                        <img className="w-10 h-10 rounded-full" src={data?.profile?.avatar}/>
                    </Link>
				</div>
			</div>
		</nav>
	);
}
