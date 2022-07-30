import {
    FormControl,
    FormLabel,
    Switch,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiFlag, FiSettings, FiMoreVertical } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { Button } from "../components";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import AddFlagModal from "../components/Modals/AddFlagModal";
import DeleteModal from "../components/Modals/DeleteModal";
import {
    deleteFlag,
    getFlagsForProject,
    updateFlag,
} from "../services/flagService";
import { deleteProject, getProjectById } from "../services/projectService";

const ProjectDetails = () => {
    const [project, setProject] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [flags, setFlags] = useState<any[]>([]);
    const { projectId } = useParams();
    const { isOpen, onClose } = useDisclosure();
    const toast = useToast();
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
            setLoading(true);
            const [project] = await getProjectById(projectId);
            const flags = await getFlagsForProject(projectId);
            setProject(project);
            setFlags(flags);
            setLoading(false);
        };

        if (projectId) {
            fetchGroups(projectId);
        }
    }, []);

    const handleDeleteFlag = async (flagId: string) => {
        const result = await deleteFlag(flagId);
        if (result) {
            window.location.reload();
        }
    };

    const handleUpdate = async (flag: any) => {
        const result = await updateFlag(flag, project.id);
        if (result) {
            const updatedFlags = flags.map((f: any) => {
                if (f.id === flag.id) {
                    return {
                        ...f,
                        state: f.state === 0 ? 1 : 0,
                    };
                }
                return f;
            });
            setFlags(updatedFlags);
            toast({
                title: "Flag Updated",
                description: "We've updated your flag",
                position: "top-right",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="ml-4 mt-2">
                        <p className="text-sm font-medium text-blue-600">
                            {project.id}
                        </p>
                        <h3 className="text-2xl leading-6 font-semibold mt-1 text-gray-900">
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
                                <MenuList p="0" rounded="sm">
                                    <p className="px-2 py-3 rounded cursor-pointer hover:bg-red-600 hover:text-white">
                                        <DeleteModal
                                            type="Project"
                                            name={project.name}
                                            handleDelete={handleProjectDelete}
                                        />
                                    </p>
                                </MenuList>
                            </Menu>
                            <AddFlagModal projectId={projectId} />
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
                        <div className="max-w-xl rounded flex flex-col items-center justify-center mx-auto mt-12 p-6">
                            {flags?.map((flag: any) => {
                                return (
                                    <div
                                        className="w-full bg-gray-50 rounded border px-6 py-3 mb-3 "
                                        key={flag.id}
                                    >
                                        <div className="flex justify-between max-w-lg items-center">
                                            <FormControl
                                                width="fit-content"
                                                as={Flex}
                                            >
                                                <div className="max-w-7xl">
                                                    <FormLabel m="0" mr="3">
                                                        <p className="text-gray-600 text-xs">
                                                            {flag.id}
                                                        </p>
                                                        <p className="text-xl mt-1 text-blue-700 font-semibold">
                                                            {flag.name}
                                                        </p>
                                                        <p className="text-gray-500 font-normal">
                                                            {flag.description}
                                                        </p>
                                                    </FormLabel>
                                                </div>
                                            </FormControl>
                                            <Box>
                                                <Switch
                                                    value={flag.state}
                                                    isChecked={flag.state}
                                                    size="lg"
                                                    colorScheme="green"
                                                    onChange={() =>
                                                        handleUpdate(flag)
                                                    }
                                                />
                                            </Box>
                                            <Box>
                                                <Menu>
                                                    <MenuButton>
                                                        <Button type="icon">
                                                            <FiMoreVertical className=" w-6 h-6" />
                                                        </Button>
                                                    </MenuButton>
                                                    <MenuList
                                                        p="0"
                                                        rounded="sm"
                                                    >
                                                        <p className="px-2 py-3 rounded cursor-pointer hover:bg-red-600 hover:text-white">
                                                            <DeleteModal
                                                                type="Flag"
                                                                name={flag.name}
                                                                handleDelete={() =>
                                                                    handleDeleteFlag(
                                                                        flag.id
                                                                    )
                                                                }
                                                            />
                                                        </p>
                                                    </MenuList>
                                                </Menu>
                                            </Box>
                                        </div>
                                        <Modal
                                            isOpen={isOpen}
                                            onClose={() => {
                                                onClose();
                                            }}
                                        >
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>
                                                    <p className="flex items-center text-blue-600">
                                                        <span className="mt-1">
                                                            Update this flag
                                                        </span>
                                                    </p>
                                                </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <p className="text-lg font-medium">
                                                        Are you sure you want to
                                                        update this {flag.name}{" "}
                                                        flag?
                                                    </p>
                                                </ModalBody>

                                                <ModalFooter>
                                                    <div>
                                                        <Button
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    flag
                                                                )
                                                            }
                                                            type="secondary"
                                                        >
                                                            Update
                                                        </Button>
                                                    </div>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </div>
                                );
                            })}
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
            <Banner />
        </div>
    );
};

export default ProjectDetails;
