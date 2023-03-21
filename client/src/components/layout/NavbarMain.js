import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useContext } from "react";
import { FcLike } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
const NavbarMain = () => {
  const location = useLocation();
  const {
    authState: {
      user: { username, imageUrl, email, role },
      isAuthenticated,
    },
    logoutUser,
  } = useContext(AuthContext);

  let navigation;
  if (isAuthenticated) {
    if (role === "admin") {
      navigation = [
        { name: "Home", to: "/", current: location.pathname === "/" },
        {
          name: "About",
          to: "/about",
          current: location.pathname === "/about",
        },
        {
          name: "FAQ",
          to: "/faq",
          current: location.pathname === "/faq",
        },
        {
          name: "All Car",
          to: "/allcar",
          current: location.pathname === "/allcar",
        },
        {
          name: "Dashboard",
          to: "/admin",
          current: location.pathname === "/admin",
        },
      ];
    } else if (role === "owner") {
      navigation = [
        { name: "Home", to: "/", current: location.pathname === "/" },
        { name: "Team", to: "/about", current: location.pathname === "/about" },
        {
          name: "FAQ",
          to: "/faq",
          current: location.pathname === "/faq",
        },
        {
          name: "All Car",
          to: "/allcar",
          current: location.pathname === "/allcar",
        },
        {
          name: "Dashboard",
          to: "/admin",
          current: location.pathname === "/admin",
        },
      ];
    } else {
      navigation = [
        { name: "Home", to: "/", current: location.pathname === "/" },
        { name: "Team", to: "/about", current: location.pathname === "/about" },
        {
          name: "FAQ",
          to: "/faq",
          current: location.pathname === "/faq",
        },
        {
          name: "All Car",
          to: "/allcar",
          current: location.pathname === "/allcar",
        },
      ];
    }
  } else {
    navigation = [
      { name: "Home", to: "/", current: location.pathname === "/" },
      { name: "Team", to: "/about", current: location.pathname === "/about" },
      {
        name: "FAQ",
        to: "/faq",
        current: location.pathname === "/faq",
      },
      {
        name: "All Car",
        to: "/allcar",
        current: location.pathname === "/allcar",
      },
    ];
  }
  const userNavigation = [
    { name: "Your Profile", to: "/profile" },
    { name: "Rental History", to: "/history" },
    { name: "Settings", to: "/setting" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const logout = () => logoutUser();

  return (
    <div className="min-h-full ">
      <div className="py-1 px-1 flex items-center justify-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 to-purple-400 animate-pulse"></div>
      <div className="bg-white-500 text-black py-4 px-4 flex items-center justify-center ">
        <FcLike />
        <p>Get 10% off your first rent with code WELCOME10!</p>
      </div>
      <Disclosure
        as="nav"
        className="bg-white-800 border border-solid border-gray-300 shadow-lg p-3"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://res.cloudinary.com/duax5havz/image/upload/v1676802281/Logo/crabcar_m1ins8.png"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-dark-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <div className="p-4">
                      <label htmlFor="table-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="table-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark-800"
                    >
                      <span className="sr-only">View notifications</span>

                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={imageUrl}
                            alt=""
                          />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.to}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            <button
                              onClick={logout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign Out
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    as="a"
                    to={item.to}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-900 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {username}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-900">
                      {email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>{" "}
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign Out <HiOutlineLogout />
                </button>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      as="a"
                      to={item.to}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}{" "}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default NavbarMain;
