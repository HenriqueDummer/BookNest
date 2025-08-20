import BookComponent from "./BookComponent";

import { IoTelescopeOutline } from "react-icons/io5";

import type { PrivateBook } from "@/Types/PrivateBook";
import type { PublicBook } from "@/Types/PublicBook";

type BookCollectionProps = {
  books: PrivateBook[] | PublicBook [] | undefined;
};

const BookCollection = ({ books }: BookCollectionProps) => {
  return (
      <div className="w-full flex justify-center lg:justify-start flex-wrap gap-5 lg:p-5">
        {!books ||
          (books.length === 0 && (
            <div className="w-full mt-40 flex justify-center text-zinc-400">
              <IoTelescopeOutline className="text-6xl" />
              <h2 className="text-xl mt-4">No books here yet</h2>
            </div>
          ))}
        {books &&
          books.map((book) => <BookComponent key={book._id} bookData={book} />)}
      </div>
  );
};

export default BookCollection;
