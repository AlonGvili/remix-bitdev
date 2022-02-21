import { Tab } from "@headlessui/react";
import { RiArrowDropRightFill } from "react-icons/ri";
import { Link, NavLink, Outlet, useLocation } from "remix";

export default function UserSettingsPage() {
  let location = useLocation();
  return (
    <div className="flex max-w-6xl w-full">
      <div className="flex flex-col space-y-4">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-violet-600 font-medium" : "font-medium"
          }
          to="profile"
        >
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-violet-600 font-medium" : "font-medium"
          }
          to="authentications"
        >
          Authentications
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-violet-600 font-medium" : "font-medium"
          }
          to="emails"
        >
          Emails
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-violet-600 font-medium" : "font-medium"
          }
          to="organizations"
        >
          Organizations
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-violet-600 font-medium" : "font-medium"
          }
          to="billing"
        >
          Billing
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
