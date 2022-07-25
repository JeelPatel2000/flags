import { useState } from "react";
import { MenuAlt1Icon } from "@heroicons/react/outline";
import Sidebar from "../components/Sidebar";
import { Profile } from "../components";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* Main column */}
                <div className="lg:pl-64 flex flex-col">
                    {/* Search header */}
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <MenuAlt1Icon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </button>
                        <div className="flex-1 flex justify-end px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center">
                                {/* Profile dropdown */}
                                <Profile isTruncated />
                            </div>
                        </div>
                    </div>
                    <main className="flex-1">
                        {/* Page title & actions */}
                        <Header pageTitle="Home" />

                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
