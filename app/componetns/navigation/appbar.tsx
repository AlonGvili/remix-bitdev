import { Menu } from "@headlessui/react";
import { Organization, Profile, Scope, User } from "@prisma/client";
import { NavLink, Form, useLoaderData, Link, useMatches } from "remix";
import MenuButton from "../misc/menu_button";
import { RiLogoutBoxFill, RiSettings3Fill } from "react-icons/ri";

export default function AppBar() {
  let loaderData = useMatches()[0]?.data;
  let data = loaderData?.data;
  console.log(data);
  return (
    <nav className="w-screen fixed inset-0 left-20 pr-24 h-16 bg-white z-20 border border-b border-gray-100">
      <div className="flex py-2 items-center px-2 w-full h-full justify-between">
        <Form className="w-4/12">
          <input
            type="text"
            className="w-full h-full max-w-xs py-2 px-4 bg-gray-200 rounded-md text-gray-600"
            name="q"
            placeholder="Search"
          />
        </Form>
        <div className="space-x-8 flex justify-center items-center">
          <MenuButton />
          <NavLink to="#" className="text-gray-500">
            Learn
          </NavLink>
          <NavLink to="#" className="text-gray-500">
            Platform
          </NavLink>
          <NavLink to="#" className="text-gray-500">
            Pricing
          </NavLink>
          <NavLink to="#" className="text-gray-500">
            Enterprise
          </NavLink>
          <MenuButton
            button={
              <button className="max-w-max py-2 px-6 bg-violet-500 text-white rounded-md">
                + New
              </button>
            }
          >
            <Link to="/create-scope">
              <Menu.Item
                as="div"
                className="px-3 py-2 text-center cursor-pointer hover:bg-gray-100 hover:rounded-lg"
              >
                Scopes ( Collections )
              </Menu.Item>
            </Link>
            <Link to="/create-org">
              <Menu.Item
                as="div"
                className="px-3 py-2 text-left cursor-pointer hover:bg-gray-100 hover:rounded-lg"
              >
                Organization
              </Menu.Item>
            </Link>
          </MenuButton>
          <MenuButton
            button={
              <img
                className="w-10 h-10 rounded-full"
                src={data?.profile?.avatar!}
              />
            }
          >
            <div className="flex flex-col space-y-4 px-2 w-56 ">
              <div className="space-y-2">
                <h3 className="uppercase text-xs font-bold pl-2 text-gray-400">
                  Logged in as
                </h3>
                <Link
                  className="flex space-x-2 items-center hover:bg-violet-100 hover:rounded-lg w-full p-2"
                  to={`/${data?.profile?.displayName}`}
                >
                  <img
                    className="w-6 h-6 rounded-full object-scale-down"
                    src={data?.profile?.avatar!}
                  />
                  <p className="text-sm font-semibold">
                    {data?.profile?.displayName}
                  </p>
                </Link>
              </div>
              <div className="space-y-2 flex flex-col">
                <h3 className="uppercase text-xs font-bold text-gray-400 pl-2">
                  Organizations
                </h3>
                {data?.organizationsAdmin?.map((org: Organization) => (
                  <Link
                    to={`/${data?.profile?.displayName}/orgs/${org.name}`}
                    className="text-sm font-semibold hover:bg-violet-100 hover:rounded-lg w-full p-2"
                  >
                    {org.name}
                  </Link>
                ))}
              </div>
              <div className="border border-gray-200" />
              <Link
                to="/settings"
                className="flex items-center space-x-2 hover:bg-violet-100 hover:rounded-lg w-full p-2"
              >
                <RiSettings3Fill className="text-gray-400" />
                <span className="text-sm font-semibold ">Settings</span>
              </Link>
              <form action="/logout" method="post">
                <button
                  type="submit"
                  className="flex items-center space-x-2 hover:bg-violet-100 hover:rounded-lg w-full p-2"
                >
                  <RiLogoutBoxFill className="text-gray-400" />
                  <span className="text-sm font-semibold ">Logout</span>
                </button>
              </form>
            </div>
          </MenuButton>
        </div>
      </div>
    </nav>
  );
}
