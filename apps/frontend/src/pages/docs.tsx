import { Link } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import Logo from "../components/Logo";

const Docs = () => {
    return (
        <>
            <div className="max-w-4xl py-2 border-b border-gray-300 mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="max-w-4xl mt-8 mx-auto px-4 sm:px-6 lg:px-8">
                <p className="font-semibold text-blue-600">Introduction</p>
                <h1 className="text-4xl font-semibold mt-2">Getting Started</h1>
                <p className="mt-4 mb-8 text-xl text-gray-500">
                    Learn how to get Flags set up in your in 10 minutes and
                    free.
                </p>
                <Divider />
                <div className="mt-8">
                    <p className="text-2xl font-semibold text-gray-700">
                        Set up your Account
                    </p>
                    <p className="mt-2 text-lg text-gray-600">
                        You will need to set up your account in Flags before you
                        connect
                    </p>
                </div>
            </div>
        </>
    );
};

export default Docs;
