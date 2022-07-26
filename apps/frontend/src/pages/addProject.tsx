import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "../components";
import { FiPlus } from "react-icons/fi";

const AddProject = () => {
    return (
        <div className="mx-auto mt-10 px-4 max-w-xl">
            <h1 className="text-3xl font-bold border-b-2 pb-3 mb-8">
                Add Project
            </h1>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                    name="name"
                    rounded="sm"
                    type="text"
                    placeholder="Enter your project name"
                />
                {/* {errors && errors.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                )} */}
            </FormControl>
            <FormControl className="my-4">
                <FormLabel>Description</FormLabel>
                <Input
                    name="description"
                    rounded="sm"
                    type="text"
                    placeholder="Enter project description"
                />
                {/* {errors && errors.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                )} */}
            </FormControl>
            <div className="mt-6">
                <Button width="w-full">
                    <span className="flex items-center">
                        <FiPlus className="mr-2" /> Create
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default AddProject;
