import { useActionData } from "remix";

export default function BillingInfo({ buttonLabel }: { buttonLabel: string }) {
  let actionData = useActionData<{
    error: true;
    message: string;
    fieldError: string;
    fields: {
      orgName: string;
    };
  }>();
  return (
    <>
      <fieldset className="grid grid-cols-2 gap-4">
        <label className="flex flex-col space-y-2">
          <p className="text-sm text-gray-400 font-bold">First name</p>
          <input
            name="firstName"
            className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
            placeholder="First name"
          />
          {actionData?.error && actionData.fieldError === "firstName" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
        </label>
        <label className="flex flex-col space-y-2">
          <p className="text-sm text-gray-400 font-bold">Last name</p>
          <input
            name="lastName"
            className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
            placeholder="Last name"
          />
          {actionData?.error && actionData.fieldError === "lastName" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
        </label>
        <label className="flex flex-col space-y-2 col-span-full">
          <p className="text-sm text-gray-400 font-bold">Phone</p>
          <input
            name="phone"
            className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
            placeholder="Phone"
          />
          {actionData?.error && actionData.fieldError === "phone" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
        </label>
        <label className="flex flex-col space-y-2">
          <p className="text-sm text-gray-400 font-bold">Billing email</p>
          <input
            name="billingEmail"
            className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
            placeholder="Billing email"
          />
          {actionData?.error && actionData.fieldError === "billingEmail" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
        </label>
        <label className="flex flex-col space-y-2">
          <p className="text-sm text-gray-400 font-bold">Country</p>
          <input
            name="country"
            className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
            placeholder="Country"
          />
          {actionData?.error && actionData.fieldError === "country" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
        </label>
      </fieldset>
      <fieldset className="grid grid-cols-2 gap-4">
        <label className="font-bold text-sm">Credit card information</label>
        <input
          name="creditCardNumber"
          className="bg-gray-100 py-2 px-6 rounded-md col-span-full placeholder:font-bold placeholder:text-gray-400"
          placeholder="1234 5678 9012 3456"
        />
        {actionData?.error && actionData.fieldError === "creditCardNumber" && (
          <p className="text-rose-600 text-sm font-bold col-span-full">
            {actionData.message}
          </p>
        )}
        <label className="flex flex-col space-y-2">
          <input
            name="creditCardDate"
            className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
            placeholder="MM/YY"
          />
          {actionData?.error && actionData.fieldError === "creditCardDate" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
        </label>
        <label className="flex flex-col space-y-2">
          <input
            name="creditCardCcv"
            className="bg-gray-100 py-2 px-6 rounded-md placeholder:font-bold placeholder:text-gray-400"
            placeholder="CCV"
          />
          {actionData?.error && actionData.fieldError === "creditCardCcv" && (
            <p className="text-rose-600 text-sm font-bold">
              {actionData.message}
            </p>
          )}
        </label>
      </fieldset>
      <button
        type="submit"
        className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-5 rounded-md max-w-max"
      >
        {buttonLabel}
      </button>
    </>
  );
}
