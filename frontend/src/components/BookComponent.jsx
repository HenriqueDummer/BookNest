import React from "react";
import { Link } from "react-router-dom";

const BookComponent = ({ bookData }) => {
  const progress =
    Math.round((bookData.currentPage / bookData.totalPages) * 1000) / 10;

  return (
    <Link to={`/book/${bookData._id}`}>
      {/* <h2 className="text-lg text-center text-zinc-300 mb-2 font-semibold max-w-full">{bookData.title}</h2> */}
      <div
        className="w-[10rem] sm:w-[12rem] lg:w-[14rem] aspect-[3/5] bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${bookData.bookCover})` }}
      >
        <div className="flex">
          <div className="absolute w-full opacity-60 h-[16px] left-0 bottom-0 bg-gray-950 "></div>
          <div
            style={{ width: `${progress}%` }}
            className={`absolute h-[16px] left-0 bottom-0 bg-gradient-to-r from-purple to-[#FF008A]`}
          ></div>
          <p className="absolute bottom-[2px] text-xs text-zinc-300 font-semibold leading-3 left-[50%] translate-x-[-50%]">
            {progress}%
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookComponent;
