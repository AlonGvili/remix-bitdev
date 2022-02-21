export default function UserProfilePage() {
  return (
    <div className="flex flex-col space-y-8 pl-8">
      <h1 className="text-2xl">My Profile</h1>
      <div>
        <h2 className="text-xl font-semibold">Manage Avatar</h2>
        <button className="text-violet-400 hover:text-violet-600 font-semibold ">
          Upload new avatar
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Change password</h2>
        <h4>Want to change your password?</h4>
        <button className="text-violet-400 hover:text-violet-600 font-semibold ">
          Request a new one
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Transform account</h2>
        <h4>Transform your personal account to an organization account.</h4>
        <button className="text-violet-400 hover:text-violet-600 font-semibold ">
          Transform account into organization
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Delete account</h2>
        <h4>
          Removing your account will remove all of your content and data
          associated with it.{" "}
        </h4>
        <button className="text-violet-400 hover:text-violet-600 font-semibold ">
          Delete account
        </button>
      </div>
    </div>
  );
}
