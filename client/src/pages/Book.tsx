import { deleteBook, getBookById, queryClient, shareBook } from "@/util/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";


import BookModal from "@/components/Modal/Modal";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const Book = () => {
  const { id } = useParams();

  if (!id) return <p>Not found!</p>

  const { data: bookData, isLoading } = useQuery({
    queryFn: () => getBookById(id),
    queryKey: ["book", id],
  });

  const { mutate } = useMutation({
    mutationFn: shareBook,
    onSuccess: (data) => {
      toast.success(data.message || "Book shared successfully!",
        { theme: "dark", autoClose: 2000 }
      );
      console.log(data)
      queryClient.setQueryData(["book", id], () => {
        return data.book
      });
    }
  })

  if (isLoading) return <Loading />

  if (!bookData) return <p className="text-zinc-400">No book found with this ID.</p>
  console.log(bookData)
  const { title, currentPage, genres, author, pubYear, totalPages, summary, shared, bookCover, userId, isPublic, bookBackground, _id } = bookData

  let progress = null;
  if (currentPage && totalPages) {
    progress = Math.round((currentPage / totalPages) * 1000) / 10;
  }

  return (
    <section className="w-full overflow-auto bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]
 from-zinc-900 bg-dark_bg">
      <div
        className="w-full h-[20rem] bg-slate-50 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${bookBackground})`,
        }}
      >
        <NavLink to="..">
          <button className="absolute top-5 left-1 sm:left-5 bg-black/60 text-zinc-300 font-semibold rounded-full py-1 px-2 lg:py-2 lg:px-4 flex gap-1 items-center">
            <IoIosArrowBack className="text-lg" />
            Back
          </button>
        </NavLink>
        {
          !isPublic &&
          <div className="flex items-center gap-2 absolute right-2 sm:right-6 top-5">
            <ConfirmActionModal
              onConfirmFn={deleteBook}
              onSuccessMessage={"Book deleted successfully!"}
              dialog={"This action cannot be undone. This will permanently delete the book from our database!"}
              queryToInvalidate={"books"}
              pendingText={"Deleting..."}

            >
              <Button variant="destructive" className="gap-3 px-2 h-8 lg:text-lg lg:px-4 lg:h-10">
                <MdDeleteForever className="text-lg lg:text-xl" />
                Delete
              </Button>
            </ConfirmActionModal>
            <BookModal
              existingFormData={bookData}
              className="gap-3 px-2 h-8 lg:text-lg lg:px-4 lg:h-10"
            >
              <BiSolidEditAlt className="text-xl" />
              Edit
            </BookModal>
            <Button onClick={() => mutate(_id)} className="gap-3 px-2 h-8 lg:text-lg lg:px-4 lg:h-10">
              {shared ? "Privatize" : "Share"}
            </Button>
          </div>
        }



      </div>
      <div className="max-w-[50rem] m-auto lg:p-10 text-zinc-300 px-5 lg:px-10 relative">
        <div
          className="absolute top-0 left-[0] -translate-x-[100%] -translate-y-[50%]  w-[14rem] h-[22rem] bg-cover bg-center rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${bookCover})`,
          }}
        ></div>
        <div className="p-5">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="mt-2 opacity-60 text-lg">
            {author} | {pubYear}
          </p>
          {!isPublic && <div className="flex mt-8">
            <div className="relative w-full h-[18px] left-0 bottom-0 bg-stone-900 rounded-lg overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className={`absolute h-full left-0 top-0 bg-gradient-to-r from-purple to-[#FF008A]`}
              ></div>
              <p className="absolute bottom-[3px] text-xs text-zinc-300 font-semibold leading-3 left-[50%] translate-x-[-50%]">
                {progress}%
              </p>
            </div>
          </div>}
          <div className="flex flex-wrap gap-3 px-5 lg:px-0 mt-8">
            {genres.map((genre) => {
              return (
                <p key={genre} className="bg-[#FF008A] px-4 py-2 rounded-full flex items-center gap-1">
                  {genre}
                </p>
              );
            })}
          </div>
          <p className="mt-4 text-justify max-w-full px-5 lg:px-0">{summary}</p>
          {
            isPublic &&
            <NavLink to={`/user/${userId._id}`} className="inline-flex items-center gap-3 mt-10 duration-200 bg-transparent cursor-pointer hover:bg-white/10 py-2 px-3 rounded-full">
              <div style={{ backgroundImage: `url(${userId.profileImg})` }} className="w-10 aspect-square bg-cover bg-center rounded-full">

              </div>
              <p className="text-zinc-400 text-sm">Shared by <span className="text-zinc-300 text-base">{userId.username}</span></p> <IoOpenOutline />
            </NavLink>
          }
        </div>

      </div>
    </section>
  );
};

export default Book;
