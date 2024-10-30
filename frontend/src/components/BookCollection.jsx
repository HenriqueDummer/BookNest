import React, { useEffect } from "react";
import BookComponent from "./BookComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBooksByStatus } from "@/util/http";

import { IoAdd } from "react-icons/io5";
import { IoTelescopeOutline } from "react-icons/io5";

import AddBookModal from "./AddBookModal";
import Loading from "./Loading";
import Error from "@/pages/Error";

const BookCollection = ({ title, status }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () =>
      status === "all" ? getAllBooks() : getBooksByStatus(status),
    queryKey: ["books", status],
  });

  if (isLoading) return <Loading message="Fetching books..." />;

  if (isError) return <Error error={error} />;

  return (
    <section className="flex-grow p-20   justify-center overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-4xl text-zinc-300 font-semibold">{title}</h1>
        <AddBookModal>
          <IoAdd className="text-xl" />
          Add book
        </AddBookModal>
      </div>
      <div className="mt-10 flex flex-wrap gap-5 p-5">
        {data.length === 0 && 
          <div className="w-full mt-40 flex-col items-center text-zinc-400">
            <IoTelescopeOutline className="text-6xl" />
            <h2 className="text-xl mt-4">No books here yet</h2>
          </div>}
        {data &&
          data.map((book) => <BookComponent key={book._id} bookData={book} />)}
      </div>
    </section>
  );
};

export default BookCollection;
