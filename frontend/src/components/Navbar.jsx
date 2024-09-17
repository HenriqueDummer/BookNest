import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
  CiLogout,
  CiHeart,
  CiBookmark,
  CiCircleCheck,
  CiBookmarkCheck,
  CiHome 
} from "react-icons/ci";
import { SiBookstack } from "react-icons/si";
import { ImBooks } from "react-icons/im";

const liStyle = "bg-slate-400 text-slate-800 flex gap-5 text-3xl items-center py-1";
const pStyle = "text-xl";

const Navbar = () => {
  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });

  return (
    <nav className="h-full w-[15rem] bg-slate-800 p-4 flex flex-col justify-between text-zinc-300">
      <div className="flex flex-col items-center ">
        <img
          className="w-[8rem] aspect-square rounded-full"
          src={authUser.profileImg}
          alt=""
        />
        <p className="text-2xl mt-2">Henrique Dummer</p>
      </div>

      <ul className="flex flex-col gap-10">
        <Link className={ImBooks} to="/">
          <li className={liStyle}>
            <CiHome   />
            <p className="text-xl">All</p>
          </li>
        </Link>
        <Link to="/reading">
          <li className={liStyle}>
            <CiBookmark />
            <p className={pStyle}>Currently Reading</p>
          </li>
        </Link>
        <Link to="/want_to_read">
          <li className={liStyle}>
            <CiHeart />
            <p className={pStyle}>Want to read</p>
          </li>
        </Link>
        <Link to="/read">
          <li className={liStyle}>
            <CiBookmarkCheck />
            <p className={pStyle}>Read</p>
          </li>
        </Link>
      </ul>
      <div>
        <CiLogout />
        <p>Logout</p>
      </div>
    </nav>
  );
};

export default Navbar;
