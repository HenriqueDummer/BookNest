import { useEffect } from "react";
import { BiSolidError } from "react-icons/bi";
import { toast } from "react-toastify";

type ErrorComponentProps = {
    error: Error
}

const ErrorComponent = ({error}: ErrorComponentProps) => {
    useEffect(() => {
        toast.error(error.message, {theme: "dark"})
    }, [])
  return (
    <div className="w-full h-full flex justify-center items-center flex-col text-zinc-100">
        <BiSolidError className="text-9xl text-purple" />
        <h1 className="text-4xl text-zinc-50 mt-4 font-semibold"> Something went wrong!</h1>
        <p className="mt-2 text-xl">Please try again later</p>
    </div>
  );
};

export default ErrorComponent;
