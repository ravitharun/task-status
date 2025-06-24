import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "My Tasks", href: "/", current: true },
  { name: "Team", href: "/team", current: false },
  { name: "Projects", href: "/projects", current: false },
  { name: "Calendar", href: "/task/Calendar", current: false },
  { name: "Reports", href: "/reports", current: false },
  { name: "Settings", href: "/settings", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100 dark:bg-gray-950">
      {/* Mobile Top Navbar */}
      <Disclosure as="nav" className="sm:hidden bg-gray-800 shadow-md w-full">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between px-4 py-4">
              <div className="text-white font-bold text-lg">Your Logo</div>
              <Disclosure.Button className="text-gray-400 hover:text-white focus:outline-none">
                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </Disclosure.Button>
            </div>

            {/* Mobile Menu */}
            <Disclosure.Panel className="space-y-1 px-2 pb-4">
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
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:block sm:w-64 bg-gray-800 shadow-lg min-h-screen">
        <div className="px-4 py-5 text-white font-bold text-xl">Your Logo</div>
        <nav className="mt-5 space-y-1 px-4">
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
        </nav>
      </aside>

      {/* Main Content */}
    </div>
  );
}
