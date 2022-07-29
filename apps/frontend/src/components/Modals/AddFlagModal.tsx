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
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import Joi from "joi";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../Button";
import { addFlag } from "../../services/flagService";

const AddFlagModal = ({ projectId }: { projectId?: string }) => {
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
        description: Joi.string().required().label("Description"),
    };

    const doSubmit = async () => {
        try {
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
            setApiError(error.response.data);
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

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button leftIcon={<FiPlus />} onClick={onOpen}>
                Add flag
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setApiError(null);
                    onClose();
                }}
            >
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
        </>
    );
};

export default AddFlagModal;
