import { CgSpinner } from "react-icons/cg";

const Loading = () => {
    return (
        <div className="mt-12 w-full flex justify-center items-center">
            <CgSpinner className="animate-spin text-3xl" />
        </div>
    );
};

export default Loading;
