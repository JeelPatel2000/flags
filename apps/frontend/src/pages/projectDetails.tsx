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
    Switch,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import Joi from "joi";
import { useEffect, useState } from "react";
import { FiPlus, FiFlag, FiSettings, FiTrash } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { Button } from "../components";
import {
    addFlag,
    deleteFlag,
    getFlagsForProject,
} from "../services/flagService";
import { deleteProject, getProjectById } from "../services/projectService";

const ProjectDetails = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [project, setProject] = useState<any>({});
    const [flags, setFlags] = useState<any>([]);
    const { projectId } = useParams();

    const [apiError, setApiError] = useState<string | null>(null);
    const [data, setData] = useState<any>({
        name: "",
    });

    const [errors, setErrors] = useState<any>({
        name: "",
        description: "",
    });

    const schema: any = {
        name: Joi.string().required().label("Name"),
        description: Joi.string().required().label("Description"),
    };

    const doSubmit = async () => {
        try {
            console.log(data);
            const result = await addFlag({
                ...data,
                projectId,
                state: false,
            });
            if (result) {
                window.location.reload();
                onClose();
            }
        } catch (error: any) {
            console.log(error);
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

    const handleProjectDelete = async () => {
        if (projectId) {
            const result = await deleteProject(projectId);

            if (result) {
                window.location.href = "/";
            }
        }
    };

    useEffect(() => {
        const fetchGroups = async (projectId: string) => {
            const [project] = await getProjectById(projectId);
            const flags = await getFlagsForProject(projectId);
            setProject(project);
            setFlags(flags);
        };

        if (projectId) {
            fetchGroups(projectId);
        }
    }, []);

    // const handleSaveFlags = () => {

    // }

    const handleDeleteFlag = async (flagId: string) => {
        const result = await deleteFlag(flagId);
        if (result) {
            window.location.reload();
        }
    };

    return (
        <div>
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
                        <div className="flex items-center ">
                            <Menu>
                                <MenuButton>
                                    <Button type="icon" margin="mr-3">
                                        <FiSettings className=" w-6 h-6" />
                                    </Button>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={handleProjectDelete}>
                                        <FiTrash className="mr-3" /> Delete
                                        Project
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Button leftIcon={<FiPlus />} onClick={onOpen}>
                                Add flag
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Add Feature Flag</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        {apiError && (
                                            <Alert status="error">
                                                <AlertIcon />
                                                {apiError}
                                            </Alert>
                                        )}
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
                                        <FormControl className="mt-3">
                                            <FormLabel>Description</FormLabel>
                                            <Input
                                                name="description"
                                                rounded="sm"
                                                type="text"
                                                onChange={handleChange}
                                                placeholder="Enter description"
                                            />
                                            {errors && errors.description && (
                                                <FormErrorMessage>
                                                    {errors.description}
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
            </div>
            <div className="p-6 ">
                <p className="text-2xl font-semibold w-full text-center">
                    Your Feature Flags
                </p>
                {flags?.length > 0 ? (
                    <div>
                        <div className="max-w-lg rounded flex flex-col items-center justify-center mx-auto mt-12 border-2 p-6">
                            {flags?.map((flag: any) => {
                                return (
                                    <div className="w-full mx-auto max-w-xs border-b mb-3 pb-2">
                                        <FormControl
                                            w="full"
                                            as={Flex}
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <FormLabel m="0" mr="3" width="4xl">
                                                {flag.name}
                                                <p className="text-gray-400 font-normal">
                                                    {flag.description}
                                                </p>
                                            </FormLabel>
                                            <Box width="sm">
                                                <Switch
                                                    value={flag.state}
                                                    size="lg"
                                                    colorScheme="green"
                                                    onChange={() => {
                                                        const updatedFlags =
                                                            flags.map(
                                                                (f: any) => {
                                                                    if (
                                                                        f.id ===
                                                                        flag.id
                                                                    ) {
                                                                        return {
                                                                            ...f,
                                                                            state:
                                                                                f.state ===
                                                                                0
                                                                                    ? 1
                                                                                    : 0,
                                                                        };
                                                                    }
                                                                    return f;
                                                                }
                                                            );
                                                        setFlags(updatedFlags);
                                                    }}
                                                />
                                            </Box>
                                            <Box
                                                onClick={() =>
                                                    handleDeleteFlag(flag.id)
                                                }
                                            >
                                                <FiTrash />
                                            </Box>
                                        </FormControl>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-center mt-8">
                            <Button>Save Flags</Button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-lg rounded flex flex-col items-center justify-center mx-auto mt-12 border-2 border-dashed p-6">
                        <FiFlag className="w-6 h-6 text-gray-500" />
                        <p className="text-lg font-semibold mt-2 text-gray-500">
                            No feature flags in this project
                        </p>
                        <p className="text-gray-500">Use the button above.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;
