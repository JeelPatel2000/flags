import {
    Alert,
    AlertIcon,
    FormControl,
    FormErrorMessage,
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
import Logo from "../components/Logo";
import Joi from "joi";
import { authService } from "../services";

type SignUpDataType = {
    name: string;
    email: string;
    password: string;
};

export default function Register() {
    const [apiError, setApiError] = useState<string | null>(null);
    const [data, setData] = useState<SignUpDataType>({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<SignUpDataType>({
        name: "",
        email: "",
        password: "",
    });

    const schema: any = {
        name: Joi.string().required().label("Name"),
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .label("Email"),
        password: Joi.string().required().min(5).label("Password"),
    };

    const doSubmit = async () => {
        try {
            const { data: response } = await authService.register(data);
            authService.loginWithJwt(response.token);
            window.location.href = "/";
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setErrors({ ...errors, email: error.response.data.error });
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
            name: "",
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

    return (
        <div className="min-h-full flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6  lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create your account
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
                                    isInvalid={errors && !!errors.name}
                                >
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        name="name"
                                        rounded="sm"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                    />
                                    {errors && errors.name && (
                                        <FormErrorMessage>
                                            {errors.name}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
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
                                            type={show ? "text" : "password"}
                                            placeholder="Enter password"
                                            onChange={handleChange}
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
                                        Register
                                    </Button>
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
