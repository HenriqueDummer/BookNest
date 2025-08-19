import { Link } from "react-router-dom";
import { IoMdShare } from "react-icons/io";
import { IoIosShareAlt } from "react-icons/io";
import { NavLink } from "react-router-dom";

type BookComponentProps = {
  bookData: {
    isPublic: boolean;
    _id: string;
    title: string;
    author: string;
    bookCover: string;
    genres: string[];
    pubYear: number;
    currentPage?: number;
    status?: string;
    totalPages?: number;
    userId: {
      _id: string;
      username: string;
    }
  }
}

const BookComponent = ({ bookData }: BookComponentProps) => {

  console.log(bookData)
  const { currentPage, genres, author, pubYear, totalPages, status, bookCover, userId, isPublic } = bookData

  let progress = null;
  if (currentPage && totalPages) {
    progress = Math.round((currentPage / totalPages) * 1000) / 10;
  }

  return (
    <div>
      <Link to={`/book/${bookData._id}`}>
        <div className="w-[9rem] sm:w-[12rem]">
          <div
            className="w-full aspect-[3/5] bg-cover bg-center rounded-xl"
            style={{ backgroundImage: `url(${bookCover})` }}
          >
          </div>
          <div className="text-zinc-300 mt-2">
            <h2 className="text-sm sm:text-base font-semibold mt-2 truncate">
              {bookData.title}
            </h2>
            <p className="text-xs sm:text-sm opacity-60">
              by {author}
            </p>
            <div className="flex gap-1 py-1">
              {genres.map(genre =>
                <p key={genre} className="text-xs bg-white/10 px-1 rounded-sm sm:text-sm opacity-70">
                  {genre}
                </p>
              )}
            </div>

          </div>
          {!isPublic &&
            <div className="mt-2 relative">
              <div
                style={{ width: `${progress}%` }}
                className={`h-4 w-full bg-red rounded-sm bg-gradient-to-r from-purple to-[#FF008A]`}
              ></div>
              <p className="absolute bottom-[2px] text-xs text-zinc-300 font-semibold leading-3 left-[50%] translate-x-[-50%]">
                {progress}%
              </p>
            </div>
          }

        </div>

      </Link>
      {
        userId &&
        <NavLink to={`/user/${userId._id}`} className="text-xs text-zinc-400 mt-1 inline-flex gap-2 items-center border border-white/10 hover:bg-white/10 px-2 py-1 rounded-full">
          <IoIosShareAlt /> <span>{userId.username}</span>
        </NavLink>
      }
    </div>

  );
};

export default BookComponent;
