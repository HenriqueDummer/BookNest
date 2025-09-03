import { deleteBook, getBookById } from "@/util/http";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

import BookModal from "@/components/Modal/Modal";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";

import BookNavbar from "@/components/BookNavbar";

const BookLayout = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { authUser } = useAuth();

  if (!authUser) {
    navigate("/login");
  }

  if (!id) return <p>Not found!</p>;

  const { data: bookData, isLoading } = useQuery({
    queryFn: () => getBookById(id),
    queryKey: ["book", id],
    staleTime: 1000 * 60 * 5,
  });

  console.log(bookData);

  if (isLoading) return <Loading />;
  if (!bookData)
    return <p className="text-zinc-400">No book found with this ID.</p>;

  const {
    title,
    author,
    pubYear,
    bookCover,
    shared,
    sharedBy,
    isPublic,
    bookBackground,
    copiedFrom,
    createdBy,
  } = bookData;

  return (
    <section
      className="w-full overflow-auto bg-dark_bg scrollbar-hide px-1 [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-track]:bg-dark_bg_sec
  [&::-webkit-scrollbar-thumb]:bg-dark_bg_third"
    >
      <div
        className="w-full h-[20rem] bg-center flex justify-center py-5 px-10 relative"
        style={{
          backgroundImage: `url(${bookBackground})`,
        }}
      >
        <div className="absolute inset-0 bg-black/45 z-0" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[68rem] h-full flex items-center gap-4">
          <div
            className="h-full aspect-[6/10] bg-cover bg-center rounded-xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${bookCover})`,
            }}
          ></div>
          <div>
            <h1 className="text-3xl text-white font-bold">{title}</h1>
            <p className="text-lg text-secondary">by {author}</p>
            <p>Published in {pubYear}</p>
            <div className="flex items-center gap-2 mt-5">
              {!isPublic && (
                <>
                  {!copiedFrom && (
                    <>
                      <BookModal
                        existingFormData={bookData}
                        className="gap-2 px-2 py-1 lg:px-2"
                      >
                        <BiSolidEditAlt size={18} />
                        Edit
                      </BookModal>
                    </>
                  )}
                  <ConfirmActionModal
                    onConfirmFn={deleteBook}
                    onSuccessMessage={"Book deleted successfully!"}
                    dialog={
                      "This action cannot be undone. This will permanently delete the book from our database!"
                    }
                    queryToInvalidate={"books"}
                    pendingText={"Deleting..."}
                  >
                    <Button
                      variant="destructive"
                      className="gap-2 px-2 py-1 lg:px-2"
                    >
                      <MdDeleteForever size={18} />
                      Delete
                    </Button>
                  </ConfirmActionModal>
                </>
              )}
            </div>
          </div>
        </div>

        <NavLink to="..">
          <button className="absolute top-5 left-1 sm:left-5 bg-black/60 text-zinc-300 font-semibold rounded-full py-1 px-2 lg:py-2 lg:px-4 flex gap-1 items-center">
            <IoIosArrowBack size={18} />
            Back
          </button>
        </NavLink>
      </div>

      <div className="w-full flex flex-col items-center mt-14">
        <div className="w-full max-w-[68rem]">
          <BookNavbar
            id={id}
            shared={shared}
            sharedBy={sharedBy}
            createdBy={createdBy}
            authUserId={authUser!._id}
            isPublic={isPublic}
          />

          <div className="my-10">
            <Outlet context={{ bookData }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookLayout;
