import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import Joi from "joi";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { Button } from "../components";
import { getProjectById } from "../services/projectService";

const ProjectDetails = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [project, setProject] = useState<any>({});
    const { projectId } = useParams();

    const [apiError, setApiError] = useState<string | null>(null);
    const [data, setData] = useState<any>({
        name: "",
    });

    const [errors, setErrors] = useState<any>({
        name: "",
    });

    const schema: any = {
        name: Joi.string().required().label("Name"),
    };
    const doSubmit = async () => {
        try {
            // const result = await addProject({
            //     ...data,
            //     userId,
            // });
            // if (result) {
            //     window.location.href = "/projects";
            // }
            // setProject({
            //     ...project,
            //     featureFlags: [
            //         ...(project.featureFlags && project.featureFlags),
            //         data,
            //     ],
            // });
            onClose();
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

    console.log(project);

    useEffect(() => {
        const fetchGroups = async (projectId: string) => {
            const [project] = await getProjectById(projectId);
            setProject(project);
        };

        if (projectId) {
            fetchGroups(projectId);
        }
    }, []);

    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-2">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {project.name}
                    </h3>
                    <p className="mt-1 text-gray-500 font-medium">
                        {project.description}
                    </p>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                    <Button leftIcon={<FiPlus />} onClick={onOpen}>
                        Add flag
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add Feature Flag</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        name="name"
                                        rounded="sm"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                    />
                                    {errors && errors.name && (
                                        <FormErrorMessage>
                                            {errors.name}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <div>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={validate()}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
