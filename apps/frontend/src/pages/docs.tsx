import { Link } from "react-router-dom";
import { Code, Divider } from "@chakra-ui/react";
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
                    <div className="border-b pb-6">
                        <p className="text-2xl font-semibold text-gray-700">
                            Set up your Account
                        </p>
                        <p className="mt-2 text-lg text-gray-600">
                            You will need to set up your account in Flags before
                            you connect. Follow the steps below.
                        </p>
                        <div className="mt-3">
                            <ol className="text-lg text-gray-700">
                                <li className="ml-2">
                                    {" "}
                                    - Register your account
                                </li>
                                <li className="ml-2">
                                    {" "}
                                    - You will be taken to the dashboard
                                </li>
                                <li className="ml-2">
                                    {" "}
                                    - Create the project. And take note of{" "}
                                    <Code>projectId</Code>
                                </li>
                            </ol>
                            <div className="w-full flex flex-col items-center justify-center mt-5">
                                <img
                                    src="../assets/project_dashboard.jpg"
                                    alt="project dashboard"
                                    className="w-3/4 h-3/4 drop-shadow-md rounded"
                                />
                                <p className="mt-2 text-gray-600">
                                    Orange box is{" "}
                                    <Code colorScheme="orange">projectId</Code>{" "}
                                    and green box is{" "}
                                    <Code colorScheme="green">flagId</Code>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl font-semibold text-gray-700">
                            <span role="img" aria-label="flag">
                                🚩
                            </span>{" "}
                            Add flags to your code
                        </p>

                        <div className="mt-3">
                            <p className="text-lg">
                                First thing you need to connect flags to website
                                is to add following code in your{" "}
                                <Code>.env</Code> file or store it as constant.
                            </p>
                            <p className="mt-2">
                                <Code
                                    className="rounded px-2"
                                    colorScheme="blue"
                                >
                                    https://flags.jeel.dev/sse/subscribeToFlagUpdates?projectId="YOUR_PROJECT_ID"
                                </Code>
                            </p>
                        </div>
                        <div className="mt-3">
                            <p className="text-lg">
                                Now create a new file and add the following code
                                to it.
                            </p>
                            <img
                                src="../assets/flagLoader.png"
                                alt="flagLoader"
                            />
                            <p className="mt-2 text-lg">
                                The above example is from a vite frontend. So
                                replace{" "}
                                <Code>import.meta.env.VITE_API_URL</Code>{" "}
                                accordingly for your project.
                            </p>
                        </div>
                        <div>
                            <p className="mt-4 text-xl font-semibold">
                                {" "}
                                Understanding the code
                            </p>
                            <p className="mt-2 text-lg">
                                - Let's start with <Code>setupEventSource</Code>{" "}
                                function
                                <br />- This is the main function were the
                                connection would be established <br />- We pass
                                in <Code>onMessageHandler</Code> from the place
                                where you call the setupEventSource function.
                                <br />- <Code>.onmessage</Code> method listen to
                                the flage update events and call the{" "}
                                <Code>onMessageHandler </Code> <br />-{" "}
                                <Code>.onerror</Code> method will retry to
                                establish the connection again if the some error
                                happens and connection gets lost. The retry will
                                happen every 6s.
                            </p>
                            <p className="mt-3 text-xl">
                                Now let's see the code for{" "}
                                <Code>onMessageHandler</Code>
                            </p>
                            <img
                                src="../assets/onMessageHandler.png"
                                alt="onMessageHandler"
                            />
                            <p className="mt-3 text-lg">
                                The above function just gets the data and sets
                                it in the state with proper formatting and then
                                the function is passed in as the parameter
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-2xl mt-2 font-semibold text-gray-700">
                                Best practices for using the flags
                            </p>
                            <p>Here are the recommended best practices: </p>
                            <ol className="text-lg mt-2 text-gray-700">
                                <li className="ml-2">
                                    {" "}
                                    - When initialize state provide types so it
                                    becomes easy to use flags
                                </li>
                                <li className="ml-2">
                                    {" "}
                                    - Never delete the flags / project before
                                    completely removing associated feature flags
                                    from your project.
                                </li>
                                <li className="ml-2">
                                    {" "}
                                    - Always use camelCase while creating flags.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-24 bg-gray-900 sm:mt-12">
                <div className="mx-auto max-w-md py-12 px-4 overflow-hidden sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-8 flex justify-center space-x-6">
                        <a
                            href="https://townhall.hashnode.com/planetscale-hackathon"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="text-white flex items-center">
                                <img
                                    src="../assets/planetscale.jpg"
                                    alt="plantscale"
                                    className="w-28 h-5 rounded"
                                />
                                <span className="text-lg mx-4 font-semibold">
                                    x
                                </span>
                                <img
                                    src="../assets/hashnode.png"
                                    alt="plantscale"
                                    className="w-28 h-5 rounded"
                                />
                            </div>
                        </a>
                    </div>
                    <div>
                        <p className="text-white mt-3 w-full text-center">
                            Built with Tailwindcss,React,Typescript and Node
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Docs;
