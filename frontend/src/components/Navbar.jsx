import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
  CiLogout,
  CiHeart,
  CiBookmark,
  CiHome,
  CiCircleCheck,
} from "react-icons/ci";
import { logout, queryClient } from "@/util/http";
import ConfirmActionModal from "./ConfirmActionModal";

const liStyle =
  "bg-purple text-white/80 flex gap-3 text-3xl items-center p-2 rounded-lg";
const pStyle = "text-lg";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <nav className="h-full w-[18rem] border-r border-x-stone-800 bg-dark_bg p-4 px-6 flex flex-col justify-between text-zinc-300">
      <div className="flex flex-col items-center ">
        <img
          className="w-[8rem] aspect-square rounded-full"
          src={authUser.profileImg}
          alt=""
        />
        <p className="text-2xl mt-2">{authUser.username}</p>
      </div>
      <ul className="flex flex-col gap-10">
        <Link to="/">
          <li className={liStyle}>
            <CiHome />
            <p className={pStyle}>All</p>
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
            <CiCircleCheck />
            <p className={pStyle}>Read</p>
          </li>
        </Link>
      </ul>
      <ConfirmActionModal
        onConfirmFn={logout}
        dialog={"You are going to logout from your account!"}
        onSuccessMessage={"Logged out successfully!"}
        pendingText={"Logging out..."}
        queryToInvalidate={"authUser"}
      >
        <button
          className="flex items-center justify-center gap-1 bg-zinc-900 py-2 w-full rounded-full"
        >
          <CiLogout className="text-lg" />
          <p className="font-semibold">Logout</p>
        </button>
      </ConfirmActionModal>
    </nav>
  );
};

export default Navbar;
