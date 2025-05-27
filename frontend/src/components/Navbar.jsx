import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

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
  "bg-purple text-white/80 flex flex-1 gap-1 lg:gap-3 text-3xl items-center justify-center lg:justify-start p-2 rounded-lg";
const pStyle = "text-sm hidden md:inline lg:text-lg";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <nav className="flex lg:flex-col lg:items-start w-full items-center justify-center lg:justify-between lg:h-full lg:w-[18rem] border-t lg:border-t-0 lg:border-r border-stone-800 bg-dark_bg p-2 lg:p-4 px-6 text-zinc-300">
      <div className="hidden lg:flex w-full flex-col mt-2">
        <p className="text-xl">Hello there</p>
        <p className="text-2xl font-semibold text-purple">{authUser.username}</p>
      </div>
      <ul className="flex w-full items-center justify-center lg:items-stretch lg:flex-col gap-5 sm:gap-10">
        <NavLink className={({isActive}) => (isActive ? "font-bold" : "")} to="/">
          <li className={liStyle}>
            <CiHome />
            <p className={pStyle}>All</p>
          </li>
        </NavLink>
        <NavLink className={({isActive}) => (isActive ? "font-bold" : "")} to="/reading">
          <li className={liStyle}>
            <CiBookmark />
            <p className={pStyle}>Currently Reading</p>
          </li>
        </NavLink>
        <NavLink className={({isActive}) => (isActive ? "font-bold" : "")} to="/want_to_read">
          <li className={liStyle}>
            <CiHeart />
            <p className={pStyle}>Want to read</p>
          </li>
        </NavLink>
        <NavLink className={({isActive}) => (isActive ? "font-bold" : "")} to="/read">
          <li className={liStyle}>
            <CiCircleCheck />
            <p className={pStyle}>Read</p>
          </li>
        </NavLink>
      </ul>
      <ConfirmActionModal
        onConfirmFn={logout}
        dialog={"You are going to logout from your account!"}
        onSuccessMessage={"Logged out successfully!"}
        pendingText={"Logging out..."}
        queryToInvalidate={"authUser"}
      >
        <button
          className="flex ml-5 sm:ml-10 p-2 lg:ml-0 items-center justify-center gap-1 bg-zinc-900  lg:py-2 lg:w-full rounded-lg lg:rounded-full"
        >
          <CiLogout className="text-3xl" />
          <p className="hidden lg:inline font-semibold">Logout</p>
        </button>
      </ConfirmActionModal>
    </nav>
  );
};

export default Navbar;
