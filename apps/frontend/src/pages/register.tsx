import {
    FormControl,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Register() {
    const [input, setInput] = useState("");

    const handleInputChange = (e: any) => setInput(e.target.value);

    const isError = false;

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <div className="min-h-full flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6  lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to="/">
                            <Image
                                className="h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                            <div className="space-y-6">
                                <FormControl isInvalid={isError}>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        rounded="sm"
                                        type="text"
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                    />
                                    {/* {!isError ? (
                                        <FormHelperText>
                                            Enter the email you'd like to
                                            receive the newsletter on.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage>
                                            Email is required.
                                        </FormErrorMessage>
                                    )} */}
                                </FormControl>
                                <FormControl isInvalid={isError}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        rounded="sm"
                                        type="email"
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder="Enter email"
                                    />
                                    {/* {!isError ? (
                                        <FormHelperText>
                                            Enter the email you'd like to
                                            receive the newsletter on.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage>
                                            Email is required.
                                        </FormErrorMessage>
                                    )} */}
                                </FormControl>
                                <FormControl isInvalid={isError}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            rounded="sm"
                                            colorScheme="facebook"
                                            pr="4.5rem"
                                            type={show ? "text" : "password"}
                                            placeholder="Enter password"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                type="icon"
                                                onClick={handleClick}
                                            >
                                                {show ? (
                                                    <FiEyeOff />
                                                ) : (
                                                    <FiEye />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {/* {!isError ? (
                                        <FormHelperText>
                                            Enter the email you'd like to
                                            receive the newsletter on.
                                        </FormHelperText>
                                    ) : (
                                        <FormErrorMessage>
                                            Email is required.
                                        </FormErrorMessage>
                                    )} */}
                                </FormControl>

                                <div>
                                    <Button width="w-full">Sign in</Button>
                                </div>
                                <div>
                                    <p className="flex">
                                        Already have an account?
                                        <Link to="/signin">
                                            <Button type="link" margin="mx-3">
                                                Sign in
                                            </Button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="../assets/register.jpg"
                    alt=""
                />
            </div>
        </div>
    );
}
