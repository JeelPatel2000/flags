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
import { useMemo, useState } from "react";
import { FiPlus, FiTrash, FiAlertCircle } from "react-icons/fi";
import Button from "../Button";

const DeleteModal = ({
    type,
    name,
    handleDelete,
}: {
    type: "Project" | "Flag";
    name: string;
    handleDelete: any;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [text, setText] = useState("");

    const disableButton = useMemo(() => {
        return text === name ? false : true;
    }, [text, name]);
    return (
        <>
            <p className="flex items-center" onClick={onOpen}>
                <FiTrash className="mr-2" /> Delete {type}
            </p>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="border-b-2">
                        <p className="flex items-center text-red-600">
                            <FiAlertCircle className="w-8 h-8 mr-4 bg-red-100 rounded-full p-1" />
                            <span className="mt-1">Delete {type}</span>
                        </p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className="text-lg font-semibold">
                            Are you sure you want to delete this {type}?
                        </p>
                        <p className="mt-3 mb-2 text-gray-600 text-md">
                            Type in the name of the {type} to delete.{" "}
                            <span className="font-semibold text-gray-900 italic underline">
                                {name}
                            </span>
                        </p>
                        <Input
                            rounded="sm"
                            placeholder={`Enter the name of ${type}`}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <div>
                            <Button
                                onClick={handleDelete}
                                disabled={disableButton}
                                type="danger"
                                leftIcon={<FiTrash />}
                            >
                                Delete
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteModal;
