/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { FiFile } from "react-icons/fi";

export default function Banner() {
    const [showBanner, setShowBanner] = useState(true);
    if (!showBanner) return <></>;
    return (
        <div className="fixed inset-x-0 bottom-0">
            <div className="bg-blue-600">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <span className="flex p-2 rounded-lg bg-blue-800">
                                <FiFile
                                    className="h-6 w-6 text-white"
                                    aria-hidden="true"
                                />
                            </span>
                            <p className="ml-3 font-medium text-white truncate">
                                <span className="md:hidden">
                                    Checkout the docs
                                </span>
                                <span className="hidden md:inline">
                                    Checkout the docs for the best practices.
                                </span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <a
                                href="/docs"
                                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
                            >
                                View Docs
                            </a>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button
                                type="button"
                                className="-mr-1 flex p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                                onClick={() => setShowBanner(false)}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XIcon
                                    className="h-6 w-6 text-white"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
