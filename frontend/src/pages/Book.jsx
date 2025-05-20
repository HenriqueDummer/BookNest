import { deleteBook, getBookById } from "@/util/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";


import AddBookModal from "@/components/AddBookModal";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import Loading from "@/components/Loading";

const Book = () => {
  const { id } = useParams();
  const { data: bookData, isLoading } = useQuery({
    queryFn: () => getBookById(id),
    queryKey: ["book", id],
  });

  if (isLoading) return <Loading />

  const progress =
    Math.round((bookData.currentPage / bookData.totalPages) * 1000) / 10;

  return (
    <section className="w-full overflow-auto">
      <div
        className="w-full h-[20rem] bg-slate-50 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${bookData.bookBackground})`,
        }}
      >
        <NavLink to={-1}>
          <button className="absolute top-5 left-1 sm:left-5 bg-black/60 text-zinc-300 font-semibold rounded-full py-2 px-4 flex gap-1 items-center">
            <IoIosArrowBack className="text-lg" />
            Back
          </button>
        </NavLink>
        <div className="flex items-center gap-2 absolute right-1 sm:right-6 top-5">
          <ConfirmActionModal 
            onConfirmFn={deleteBook}
            onSuccessMessage={"Book deleted successfully!"}
            dialog={"This action cannot be undone. This will permanently delete the book from our database!"}
            queryToInvalidate={"books"}
            pendingText={"Deleting..."}
            
            >
            <Button variant="destructive" className="gap-3 text-lg px-4 h-10">
              <MdDeleteForever className="text-xl" />
              Delete
            </Button>
          </ConfirmActionModal>
          <AddBookModal
            existingFormData={bookData}
            className="gap-3 text-lg px-4 h-10"
          >
            <BiSolidEditAlt className="text-xl" />
            Edit
          </AddBookModal>
        </div>
        <div
          className="absolute bottom-0 left-[30rem] translate-y-[50%] w-[14rem] h-[22rem] bg-cover bg-center rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${bookData.bookCover})`,
          }}
        ></div>
      </div>
      <div className="max-w-[50rem] m-auto mt-[10rem] p-5 text-zinc-300 px-10">
        
        <h1 className="text-4xl font-semibold">{bookData.title}</h1>
        <p className="mt-2 opacity-60 text-lg">
          {bookData.author} | {bookData.pubYear}
        </p>
        <div className="flex my-8">
          <div className="relative  w-full h-[18px] left-0 bottom-0 bg-stone-900 rounded-lg overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className={`absolute h-full left-0 top-0 bg-gradient-to-r from-purple to-[#FF008A]`}
            ></div>
            <p className="absolute bottom-[3px] text-xs text-zinc-300 font-semibold leading-3 left-[50%] translate-x-[-50%]">
              {progress}%
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          {bookData.genres.map((genre) => {
            return (
              <p className="bg-[#FF008A] px-4 py-2 rounded-full flex items-center gap-1">
                {genre}
              </p>
            );
          })}
        </div>
        <p className="mt-4 text-justify max-w-full">{bookData.summary}</p>
      </div>
    </section>
  );
};

export default Book;
