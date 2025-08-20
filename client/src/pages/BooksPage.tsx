import BookCollection from "@/components/BookCollection";
import Loading from "@/components/Loading";
import BookModal from "@/components/Modal/Modal";
import useBooks from "@/hooks/useBooks";
import { IoAdd } from "react-icons/io5";
import ErrorComponent from "./ErrorComponent";

type BooksPageProps = {
  status?: "all" | "reading" | "finished" | "wishlist";
  isPublic?: boolean;
  title: string;
};

const BooksPage = ({ status, title, isPublic = false }: BooksPageProps) => {
  const { data, isLoading, isError, error } = useBooks({ isPublic, status });

  if (isLoading) return <Loading message="Fetching books..." />;

  if (isError) return <ErrorComponent error={error} />;

  return (
    <section
      className="flex-grow p-4 sm:p-10 lg:p-20 justify-center overflow-auto
 bg-dark_bg"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl text-zinc-300 font-semibold">
          {title}
        </h1>
        <BookModal>
          <IoAdd className="text-xl" />
          Add book
        </BookModal>
      </div>
      <div className="mt-10">
        <BookCollection books={data} />
      </div>
    </section>
  );
};

export default BooksPage;
