import { useActionData } from "remix";

export default function Input({
  name,
  label,
  placeholder,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  let actionData = useActionData();
  return (
    <label className="flex flex-col space-y-2">
      <p className="text-sm text-gray-400 font-bold">{label}</p>
      <input
        name={name}
        className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
        placeholder={placeholder}
        {...rest}
      />
      {actionData?.error && actionData.fieldError === label && (
        <p className="text-rose-600 text-sm font-bold">{actionData.message}</p>
      )}
    </label>
  );
}
