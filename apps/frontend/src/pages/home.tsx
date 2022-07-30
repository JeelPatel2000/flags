import { Box, Image } from "@chakra-ui/react";
import { Button } from "../components";
import { FiArrowUpRight, FiFile, FiFlag, FiFolderPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getAllProjectsForUser } from "../services/projectService";
import Loading from "../components/Loading";
import Banner from "../components/Banner";

const images = [1032, 1037, 1065];

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const user = getCurrentUser();

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const { data: res } = await getAllProjectsForUser(user.id);
            setProjects(res);
            setLoading(false);
        };

        fetchProjects();
    }, [user.id]);
    if (loading) return <Loading />;
    return (
        <div className="flex flex-col mx-auto mt-10 px-4 max-w-7xl  justify-center">
            <div>
                <p className="w-full flex justify-between uppercase my-4 text-gray-600 font-semibold">
                    Projects
                    {projects.length >= 3 && (
                        <Link to="/projects">
                            <Button type="link" rightIcon={<FiArrowUpRight />}>
                                View All
                            </Button>
                        </Link>
                    )}
                </p>
                {projects.length > 0 ? (
                    <div className="w-full grid place-items-center xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-2  xl:gap-y-6 sm:gap-x-3">
                        {projects.slice(0, 3).map((project, index) => (
                            <Link
                                to={`/project_details/${project.id}`}
                                key={project.id}
                            >
                                <Box
                                    maxW="sm"
                                    w="sm"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    overflow="hidden"
                                    height="sm"
                                    className="relative drop-shadow-sm group bg-white hover:cursor-pointer"
                                >
                                    <h1 className="text-white font-semibold top-40 left-36 z-10 text-3xl absolute group-hover:flex group-hover:items-center hidden">
                                        Open <FiArrowUpRight />
                                    </h1>
                                    <Image
                                        height="72"
                                        width="full"
                                        src={`https://picsum.photos/id/${images[index]}/1000/1000`}
                                        alt="project_image"
                                        className="group-hover:blur-sm"
                                    />

                                    <Box p="6" className=" group-hover:blur-sm">
                                        <div className="flex justify-between items-center">
                                            <div className="text-lg font-semibold text-gray-600">
                                                {project.name}
                                            </div>
                                            <div className="flex items-center text-lg text-gray-600">
                                                <FiFlag className="mr-2 text-green-600" />
                                                {project.noOfFeatureFlags}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 font-medium">
                                            {project.description}
                                        </p>
                                    </Box>
                                </Box>
                            </Link>
                        ))}
                    </div>
                ) : projects ? (
                    <div className="flex justify-center">
                        <div className="pattern-dots-xl max-w-xl text-gray-100 p-8 mt-8 flex flex-col justify-center items-center border-2 border-dashed rounded">
                            <p>
                                <FiFolderPlus className="w-8 h-8 text-gray-600" />
                            </p>
                            <p className="text-xl mt-3 font-semibold text-gray-600">
                                No Projects
                            </p>
                            <p className="mt-2 text-gray-400 font-mediumg flex flex-col sm:flex-row">
                                Start by referring the{" "}
                                <Button
                                    type="link"
                                    margin="mx-1"
                                    width="w-fit"
                                    leftIcon={<FiFile />}
                                >
                                    Docs.
                                </Button>
                                Or create using the button.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <Loading />
                    </div>
                )}
            </div>
            <Banner />
        </div>
    );
};

export default Home;
