import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

type MenuButtonProps = {
	button?: React.ReactNode;
	children?: React.ReactNode;
};

export default function MenuButton({ button, children }: MenuButtonProps) {
	return (
		<Menu as="div" className="ml-3 relative">
			<div>
				<Menu.Button className="flex text-sm focus:outline-none focus:ring-0 focus:ring-offset-0">
					<span className="sr-only">Open user menu</span>
					{button}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-left absolute right-0 mt-2 rounded-md min-w-max shadow-lg p-3 bg-white  focus:outline-none">
					{children}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
