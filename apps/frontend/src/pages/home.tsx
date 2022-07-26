import { Box, Image } from "@chakra-ui/react";
import { Button } from "../components";
import { FiArrowUpRight, FiFlag } from "react-icons/fi";
import { Link } from "react-router-dom";

const projects = [
    {
        name: "Project Name",
        noOfFeatureFlags: 10,
        imageId: 1032,
    },
    {
        name: "Project Name",
        noOfFeatureFlags: 10,
        imageId: 1045,
    },
    {
        name: "Project Name",
        noOfFeatureFlags: 10,
        imageId: 1037,
    },
    {
        name: "Project Name",
        noOfFeatureFlags: 10,
        imageId: 1065,
    },
];

const Home = () => {
    return (
        <div className="flex flex-col mx-auto mt-10 px-4 max-w-7xl  justify-center">
            <div>
                <p className="w-full flex justify-between uppercase my-4 text-gray-600 font-semibold">
                    Projects
                    <Link to="/projects">
                        <Button type="link" rightIcon={<FiArrowUpRight />}>
                            View All
                        </Button>
                    </Link>
                </p>
                <div className="w-full grid place-items-center xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-2  xl:gap-y-6 sm:gap-x-3">
                    {projects.length > 0 ? (
                        <>
                            {projects.slice(0, 3).map((project) => (
                                <Link to="/project_details">
                                    <Box
                                        maxW="sm"
                                        w="sm"
                                        borderWidth="1px"
                                        borderRadius="md"
                                        overflow="hidden"
                                        height="sm"
                                        className="relative drop-shadow-sm group hover:cursor-pointer"
                                    >
                                        <h1 className="text-white font-semibold top-40 left-36 z-10 text-3xl absolute group-hover:flex group-hover:items-center hidden">
                                            Open <FiArrowUpRight />
                                        </h1>
                                        <Image
                                            height="72"
                                            width="full"
                                            src={`https://picsum.photos/id/${project.imageId}/1000/1000`}
                                            alt="project_image"
                                            className="group-hover:blur-sm"
                                        />

                                        <Box
                                            p="6"
                                            className=" group-hover:blur-sm"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="text-lg font-semibold text-gray-600">
                                                    {project.name}
                                                </div>
                                                <div className="flex items-center text-lg text-gray-600">
                                                    <FiFlag className="mr-2 text-green-600" />
                                                    {project.noOfFeatureFlags}
                                                </div>
                                            </div>
                                        </Box>
                                    </Box>
                                </Link>
                            ))}
                        </>
                    ) : (
                        <>
                            <h1>Hello</h1>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
