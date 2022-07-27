import {
    Alert,
    AlertIcon,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { Button } from "../components";
import { FiPlus } from "react-icons/fi";
import Joi from "joi";
import { useState } from "react";
import { addProject } from "../services/projectService";
import { getCurrentUser } from "../services/authService";

const AddProject = () => {
    const { userId } = getCurrentUser();

    const [apiError, setApiError] = useState<string | null>(null);
    const [data, setData] = useState<any>({
        name: "",
        description: "",
    });

    const [errors, setErrors] = useState<any>({
        name: "",
        description: "",
    });

    const schema: any = {
        name: Joi.string().required().label("Name"),
        description: Joi.string().allow("").label("description"),
    };

    const doSubmit = async () => {
        try {
            const result = await addProject({
                ...data,
                userId,
            });
            if (result) {
                window.location.href = "/projects";
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setErrors({ ...errors, name: error.response.data });
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
            description: "",
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

    return (
        <div className="mx-auto mt-10 px-4 max-w-xl">
            <h1 className="text-3xl font-bold border-b-2 pb-3 mb-8">
                Add Project
            </h1>
            {apiError && (
                <Alert status="error">
                    <AlertIcon />
                    {apiError}
                </Alert>
            )}
            <FormControl isInvalid={errors && errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    name="name"
                    rounded="sm"
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter your project name"
                />
                {errors && errors.name && (
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl
                className="my-4"
                isInvalid={errors && errors.description}
            >
                <FormLabel>Description</FormLabel>
                <Input
                    name="description"
                    rounded="sm"
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter project description"
                />
                {errors && errors.description && (
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                )}
            </FormControl>
            <div className="mt-6">
                <Button
                    width="w-full"
                    onClick={handleSubmit}
                    disabled={validate() || apiError}
                >
                    <span className="flex items-center">
                        <FiPlus className="mr-2" /> Create
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default AddProject;
