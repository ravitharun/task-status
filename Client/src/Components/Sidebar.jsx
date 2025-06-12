import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Team", href: "/team", current: false },
  { name: "Projects", href: "/projects", current: false },
  { name: "Calendar", href: "/calendar", current: false },
  { name: "Reports", href: "/reports", current: false },
  { name: "Settings", href: "/settings", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 ">
      <Disclosure
        as="nav"
        className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg z-50"
      >
        {({ open }) => (
          <>
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
              <div className="text-white font-bold text-lg">Your Logo</div>
              <Disclosure.Button className="sm:hidden text-gray-400 hover:text-white focus:outline-none">
                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </Disclosure.Button>
            </div>

            {/* Navigation */}
            <div className="hidden sm:block px-4">
              <div className="mt-5 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Panel */}
            <Disclosure.Panel className="sm:hidden px-4 pb-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
