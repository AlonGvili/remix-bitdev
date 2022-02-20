import { Link } from "remix";
import { RiCloseFill } from "react-icons/ri";

export default function PageHeader({ to }: { to: string }) {
	return (
		<div className="fixed w-full inset-0 flex justify-between items-center h-20 p-8">
			<Link to="/">
				<img className="w-12 h-12 object-cover" src="https://static.bit.dev/bit-logo.svg" />
			</Link>
			<Link to={to}>
				<RiCloseFill className="w-8 h-8 text-gray-400" />
			</Link>
		</div>
	);
}
