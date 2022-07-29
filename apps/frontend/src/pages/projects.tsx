import { ChevronRightIcon } from "@heroicons/react/outline";
import { Button } from "../components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProjectsForUser } from "../services/projectService";
import { getCurrentUser } from "../services/authService";
import { FiFile, FiFolderPlus } from "react-icons/fi";
import Loading from "../components/Loading";

const Projects = () => {
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

    if (loading || !projects) return <Loading />;

    return (
        <div className="sm:mx-auto mt-10 px-4 max-w-full sm:max-w-2xl">
            <h1 className="uppercase font-semibold">Projects</h1>
            {projects.length > 0 ? (
                <div className="mt-6 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden rounded border-b border-gray-200 shadow">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-800"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-800"
                                            >
                                                Description
                                            </th>

                                            {/* <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                                        >
                                            Members
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                                        >
                                            Total Expenses
                                        </th> */}
                                            <th
                                                scope="col"
                                                className="relative px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {projects.map((project) => (
                                            <tr key={project.id}>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {project.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {project.description}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <Link
                                                        to={`/project_details/${project.id}`}
                                                    >
                                                        <Button
                                                            type="link"
                                                            rightIcon={
                                                                <ChevronRightIcon className="w-5" />
                                                            }
                                                        >
                                                            Open{" "}
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="pattern-dots-xl text-gray-100 p-8 mt-8 flex flex-col justify-center items-center border-2 border-dashed rounded">
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
            )}
        </div>
    );
};
export default Projects;
