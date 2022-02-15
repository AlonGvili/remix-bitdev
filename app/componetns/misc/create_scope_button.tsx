import { RiFolderAddLine } from "react-icons/ri";
import { Link } from "remix";

export default function CreateScopeButton() {
	return (
		<Link to="/create-scope" className="flex items-center justify-center">
			<button className="bg-violet-500 text-white font-bold py-3 px-12 rounded-md  hover:bg-violet-600">
				<span>Create Scope</span>
			</button>
		</Link>
	);
}
