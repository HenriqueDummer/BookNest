import BookComponent from "./BookComponent";

import { IoAdd } from "react-icons/io5";
import { IoTelescopeOutline } from "react-icons/io5";

import BookModal from "./Modal/Modal";
import Loading from "./Loading";
import Error from "@/pages/Error";
import useBooks from "@/hooks/useBooks";

type BookCollectionProps = {
  title: string;
  status?: string;
  isPublic: boolean;
}

const BookCollection = ({ title, status, isPublic }: BookCollectionProps) => {
  const { data, isLoading, isError, error } = useBooks({isPublic, status})

  if (isLoading) return <Loading message="Fetching books..." />;

  if (isError) return <Error error={error} />;

  return (
    <section className="flex-grow p-4 sm:p-10 lg:p-20 justify-center overflow-auto
 bg-dark_bg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl text-zinc-300 font-semibold">{title}</h1>
        <BookModal>
          <IoAdd className="text-xl" />
          Add book
        </BookModal>
      </div>
      <div className="mt-10 w-full flex justify-center lg:justify-start flex-wrap gap-5 lg:p-5">
        {!data || data.length === 0 && (
          <div className="w-full mt-40 flex justify-center text-zinc-400">
            <IoTelescopeOutline className="text-6xl" />
            <h2 className="text-xl mt-4">No books here yet</h2>
          </div>
        )}
        {data &&
          data.map((book) => <BookComponent key={book._id} bookData={book} />)}
      </div>
    </section>
  );
};

export default BookCollection;
