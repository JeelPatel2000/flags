import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Joi from "joi";
import { authService } from "../services";
import Logo from "../components/Logo";

type SignInDataType = {
    email: string;
    password: string;
};

export default function SignIn() {
    const [apiError, setApiError] = useState<string | null>(null);
    const [data, setData] = useState<SignInDataType>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<SignInDataType>({
        email: "",
        password: "",
    });

    const schema: any = {
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .label("Email"),
        password: Joi.string().required().min(5).label("Password"),
    };

    const doSubmit = async () => {
        try {
            await authService.login(data.email, data.password);
            window.location.href = "/";
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setErrors({ ...errors, email: error.response.data });
            } else {
                setApiError(error.response.data);
            }
        }
    };

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.object(schema).validate(data, options);
        if (!error) return null;
        const errors: any = {};
        for (const item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    const validateProperty = ({ name, value }: any) => {
        const obj = { [name]: value };
        const Joischema = { [name]: schema[name] };
        const { error } = Joi.object(Joischema).validate(obj);
        return error ? error.details[0].message : null;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = validate();
        setErrors(errors);
        if (errors) return;
        doSubmit();
    };

    const handleChange = ({ currentTarget: input }: any) => {
        setApiError(null);
        setErrors({
            email: "",
            password: "",
        });
        const errorMessage = validateProperty(input);
        if (errors) {
            // @ts-ignore
            if (errorMessage) errors[input.name] = errorMessage;
            // @ts-ignore
            else delete errors[input.name];
        }

        setData({ ...data, [input.name]: input.value });
        setErrors(errors);
    };
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    useEffect(() => {
        document.title = "SplitBill | SignIn";
    }, []);

    return (
        <div className="min-h-full flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6  lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-8">
                        {apiError && (
                            <Alert status="error">
                                <AlertIcon />
                                {apiError}
                            </Alert>
                        )}
                        <div className="mt-6">
                            <div className="space-y-6">
                                <FormControl
                                    isInvalid={errors && !!errors.email}
                                >
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        name="email"
                                        rounded="sm"
                                        type="email"
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                    />
                                    {errors && errors.email && (
                                        <FormErrorMessage>
                                            {errors.email}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl
                                    isInvalid={errors && !!errors.password}
                                >
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            name="password"
                                            rounded="sm"
                                            colorScheme="facebook"
                                            pr="4.5rem"
                                            onChange={handleChange}
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
                                    {errors && errors.password && (
                                        <FormErrorMessage>
                                            {errors.password}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>

                                <div>
                                    <Button
                                        width="w-full"
                                        onClick={handleSubmit}
                                        disabled={validate() || apiError}
                                    >
                                        Sign in
                                    </Button>
                                </div>
                                <div>
                                    <p className="flex">
                                        Don't have an account?
                                        <Link to="/register">
                                            <Button type="link" margin="mx-3">
                                                Register
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
                    src="../assets/login.jpg"
                    alt=""
                />
            </div>
        </div>
    );
}
