import { ChevronRightIcon } from "@heroicons/react/outline";
import { Button } from "../components";
import { Link } from "react-router-dom";

const Projects = () => {
    const projects: any[] = [{
        _id: 1,
        name: "Frontend",
        description: 'Frontend project for hashnode'
    }];

    return (
        <div className="mx-auto mt-10 px-4 max-w-2xl">
            <h1 className="uppercase font-semibold">Projects</h1>
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
                                        <tr key={project._id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                {project.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {project.description}
                                            </td>
                                            {/* <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {project.members?.length}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {project?.totalExpenses}
                                            </td> */}

                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <Link to="/project_details">
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
        </div>
    );
};
export default Projects;
