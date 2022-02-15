import emptyImage from "~/assets/no-components.svg";

type EmptyProps = {
	title?: string;
	description?: string;
	children?: React.ReactNode;
	action?: React.ReactNode;
};

export default function Empty({ title, description, children, action }: EmptyProps) {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 my-[5%]">
			<h1 className="text-gray-500 text-xl font-bold">{title || <span>Nothing to see here</span>}</h1>
			{children || <img src={emptyImage} />}
			<p className="text-gray-500 text-lg">{description || <span>You can add some content here by clicking the button below.</span>}</p>
			{action || (
				<button className="bg-violet-500 text-white font-bold py-3 px-12 rounded-md  hover:bg-violet-600">
					<span>Create Scope</span>
				</button>
			)}
		</div>
	);
}
