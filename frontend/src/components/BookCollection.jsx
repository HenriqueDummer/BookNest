import React, { useEffect } from "react";
import Book from "../components/Book";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBooksByStatus } from "@/util/http";


import AddBookModal from "./AddBookModal";

const BookCollection = ({ title, status }) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => status === 'all' ? getAllBooks() : getBooksByStatus(status),
    queryKey: ["books", status],
  });

  function handleAddBook() {
    console.log("Add");
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section className="flex-grow h-full p-5 flex flex-col justify-center bg-gray-900">
      <div className="flex justify-between">
        <h1 className="text-4xl text-zinc-300 font-semibold">{title}</h1>
        <AddBookModal />
        {/* <Button onClick={handleAddBook} variant="outline">
          <IoAdd className="text-lg" />
          Add book
        </Button> */}
      </div>
      <div className="flex flex-wrap gap-5 p-5">
        {data && data.map((book) => <Book key={book._id} bookData={book} />)}
      </div>
    </section>
  );
};

export default BookCollection;
