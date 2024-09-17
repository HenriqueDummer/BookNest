import React from "react";
import { Link } from "react-router-dom";

const Book = ({ bookData }) => {
  const progress = Number((bookData.currentPage / bookData.totalPages) * 100)

  return (
    <Link>
      {/* <h2 className="text-lg text-center text-zinc-300 mb-2 font-semibold max-w-full">{bookData.title}</h2> */}
      <div
        className="w-[14rem] h-[22rem] bg-cover relative rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${bookData.bookCover})` }}
      >
        <div className="flex">
          <div className="absolute w-full opacity-60 h-[16px] left-0 bottom-0 bg-gray-950 "></div>
          <div className={`absolute w-[${progress}%] h-[16px] left-0 bottom-0 bg-gradient-to-r from-violet-500 to-fuchsia-500`}></div>
          <p className="absolute bottom-[2px] text-sm text-zinc-400 font-semibold leading-3 left-[50%] translate-x-[-50%]">{progress}%</p>
        </div>
      </div>
    </Link>
  );
};

export default Book;
