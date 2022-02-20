import { RiFunctionFill } from "react-icons/ri";
import ComponentCard from "~/componetns/cards/component_card";

export default function Components() {
	return (
		<div>
			<h1 className="text-xl font-bold">Components from the community</h1>
			<ComponentCard
				title="Icon line"
				description="A responsive carousel based on `react-slick`, showing real user testimonials."
				version="v.1.51"
				avatar={<RiFunctionFill className="w-24 h-24 text-white" />}
				download={1234}
				language="REACT"
				size="1.5KB"
				visibility="PUBLIC"
				color="violet-500"
			/>
		</div>
	);
}
