import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { HomeIcon, ViewListIcon, XIcon } from "@heroicons/react/outline";
import { classNames } from "../../services/utilService";
import Logo from "../Logo";
import Profile from "../Profile";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
    const [navigation, setNavigation] = useState([
        { name: "Home", href: "/", icon: HomeIcon, current: true },
        {
            name: "Projects",
            href: "/projects",
            icon: ViewListIcon,
            current: false,
        },
    ]);

    const { pathname } = useLocation();
    useEffect(() => {
        const updatePathName = pathname.split("/")[1].toLowerCase();

        setNavigation(
            navigation.map((item) => {
                if (
                    item.name.toLowerCase() === updatePathName ||
                    (pathname === "/" && item.name.toLowerCase() === "home") ||
                    ((updatePathName === "projects" ||
                        updatePathName === "add_project") &&
                        item.name.toLowerCase() === "project_details")
                ) {
                    item.current = true;
                } else {
                    item.current = false;
                }

                return item;
            })
        );
    }, [pathname]);

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 text-3xl font-bold flex items-center px-4">
                                <Logo /> <span className="ml-3">Flags</span>
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2">
                                    <div className="space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                                                    "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current
                                                            ? "text-gray-500"
                                                            : "text-gray-400 group-hover:text-gray-500",
                                                        "mr-3 flex-shrink-0 h-6 w-6"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <h3
                                            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                            id="mobile-teams-headline"
                                        >
                                            Teams
                                        </h3>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
                <div className="flex text-3xl font-bold items-center flex-shrink-0 px-6">
                    <Logo /> <span className="ml-3">Flags</span>
                </div>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
                    {/* User account dropdown */}
                    <Profile isTruncated={false} />

                    {/* Navigation */}
                    <nav className="px-3 mt-6">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-200 text-gray-900"
                                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current
                                                ? "text-gray-500"
                                                : "text-gray-400 group-hover:text-gray-500",
                                            "mr-3 flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
