import React from "react";
import { Combobox, Dialog } from "@headlessui/react";
import { Scope } from "@prisma/client";

export default function CommandPalette({ scopes }: { scopes: Scope[] }) {
  let [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="min-h-full">
      <Dialog
        as="div"
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 w-full z-30 overflow-y-auto p-4 pt-[25vh]"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/75 w-full z-40" />
        <Combobox
          onChange={() => {}}
          value=""
          as="div"
          className="relative z-50 mx-auto max-w-2xl rounded-xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
        >
          <Combobox.Input
            onChange={() => {}}
            className="w-full px-4 py-1 h-12 bg-transparent text-gray-600 placeholder-gray-400 placeholder:font-semibold focus:ring-0 border-0 outline-none"
            placeholder="Search for components..."
          />
          <Combobox.Options>
            {scopes?.map((scope) => (
              <Combobox.Option value={scope}>
                {({ active }) => (
                  <div
                    className={` py-2 px-2 flex flex-col space-y-1 text-sm ${
                      active ? "bg-violet-200 text-violet-800" : "bg-white"
                    }`}
                  >
                    <span className="font-bold">{scope.name}</span>
                    <span
                      className={
                        active
                          ? "text-sm text-violet-600"
                          : "text-sm text-gray-400"
                      }
                    >
                      {scope.description}
                    </span>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </Dialog>
    </div>
  );
}
