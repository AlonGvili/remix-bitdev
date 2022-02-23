import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { authenticator } from "~/services/auth.server";
import { RiGithubFill, RiGoogleFill } from "react-icons/ri";
import { sessionStorage } from "~/services/session.server";

type LoaderData = {
  error: { message: string } | null;
};

export const meta: MetaFunction = () => {
  return { title: "Login to your account" };
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, { successRedirect: "/" });
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const error = session.get(
    authenticator.sessionErrorKey
  ) as LoaderData["error"];
  return json<LoaderData>({ error });
};

// app/routes/login.tsx
export default function Login() {
  const { error } = useLoaderData<LoaderData>();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="items-center flex flex-col max-w-sm w-full p-4">
        <img
          src="https://camo.githubusercontent.com/184cd23101496db643aa5a8a257556d215903a43991fd4ede78518f744d99501/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6269742d646f63732f726561646d652d6c6f676f2532302836292e706e67"
          alt="logo"
          className="aspect-square object-cover w-[72px] h-[72px] mb-8"
        />
        <h1 className="text-2xl mb-12">Login to Bit Cloud</h1>
        <Form
          action="/auth/google"
          method="post"
          className="max-w-sm w-full flex justify-center mb-4"
        >
          <button className="uppercase font-bold text-sm leading-loose py-2 px-8 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white rounded-md w-full flex items-center justify-center">
            <RiGoogleFill className="inline-block w-6 h-6 mr-2" />
            Connect with Google
          </button>
        </Form>

        <Form
          action="/auth/github"
          method="post"
          className="max-w-sm w-full flex justify-center"
        >
          <button className=" uppercase font-bold text-sm leading-loose py-2 px-8 bg-slate-900 text-white rounded-md w-full flex items-center justify-center">
            <RiGithubFill className="inline-block w-6 h-6 mr-2" />
            Connect with GitHub
          </button>
        </Form>

        <div className="flex justify-center items-center w-full my-4">
          <div className="border-dashed border-gray-200 border w-full" />
          <p className="mx-2">OR</p>
          <div className="border-dashed border-gray-200 border w-full" />
        </div>

        <Form
          method="post"
          action="/auth/form"
          className="flex flex-col space-y-5 w-full"
        >
          {error &&
            !error.message.includes("Email is required") &&
            !error.message.includes("Password is required") && (
              <p className="text-red-400 text-center font-medium">
                {error.message}
              </p>
            )}
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="py-2 px-8 w-full bg-gray-200 rounded-md"
          />
          {error && error.message.includes("Email is required") && (
            <p className="text-red-400 text-left font-medium">
              {error.message}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="py-2 px-8 w-full bg-gray-200 rounded-md"
          />
          {error && error.message.includes("Password is required") && (
            <p className="text-red-400 text-left font-medium">
              {error.message}
            </p>
          )}
          <button
            type="submit"
            className="uppercase font-bold bg-violet-600 text-sm text-white leading-loose py-2 px-8 rounded-md w-full flex items-center justify-center"
          >
            Login
          </button>
          <Link to="/password_reset" className="text-violet-500 font-semibold">
            Forgot your password ?
          </Link>
        </Form>
        <div className="border border-dotted w-full border-gray-200 my-6" />
        <div className="flex">
          <p className="mr-2">New user?</p>
          <Link to="/signup" className="text-violet-500 font-semibold">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
