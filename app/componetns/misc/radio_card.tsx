import { RadioGroup } from "@headlessui/react";

type RadioCardProps = {
	children: React.ReactNode;
	value: string;
    className?: string;
};

export default function RadioCard({ children, value, className }: RadioCardProps) {
	return (
		<RadioGroup.Option value={value}>
			{({ checked }) => (
				<div
					className={`${className ? className : 'flex flex-col justify-between items-center p-6 space-y-4'} min-h-full cursor-pointer ${
						checked ? "border-2 border-violet-600 rounded-lg shadow-xl shadow-violet-200" : "border-2 border-gray-200 rounded-lg"
					} `}
				>
					{children}
				</div>
			)}
		</RadioGroup.Option>
	);
}
