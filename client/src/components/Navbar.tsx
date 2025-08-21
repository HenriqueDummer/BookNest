import { NavLink } from "react-router-dom";

import {
  CiLogout,
  CiHeart,
  CiBookmark,
  CiCircleCheck,
} from "react-icons/ci";
import { RiBookFill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi";
import ConfirmActionModal from "./ConfirmActionModal";
import useAuth from "@/hooks/useAuth";

const liStyle =
  "bg-transparent hover:text-zinc-300 duration-200 flex flex-1 gap-1 lg:gap-3 text-2xl items-center justify-center lg:justify-start p-2 rounded-lg";
const pStyle = "text-sm hidden md:inline";

const navItems = [
  { to: "/", label: "Public", icon: <BiWorld /> },
  { to: "/my_books", label: "My books", icon: <RiBookFill /> },
  { to: "/reading", label: "Reading", icon: <CiBookmark /> },
  { to: "/wishlist", label: "Wishlist", icon: <CiHeart /> },
  { to: "/finished", label: "Finished", icon: <CiCircleCheck /> },
];

const NavbarLink = ({ to, label, icon }: { to: string; label: string; icon: JSX.Element }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? "font-semibold text-purple hover:text-purple" : ""
    }
  >
    <li className={liStyle}>
      {icon}
      <p className={pStyle}>{label}</p>
    </li>
  </NavLink>
);

const Navbar = () => {
  const { authUser, logout, isLoggingOut } = useAuth();

  return (
    <nav className="flex lg:flex-col lg:items-start w-full items-center justify-center lg:justify-between lg:h-full lg:w-[14rem] border-t lg:border-t-0 lg:border-r border-stone-800 bg-neutral-950 p-2 lg:p-4 px-6 text-zinc-300">
      <NavLink to={`/user/${authUser?._id}`} className="hidden lg:flex w-full flex-col mt-2">
        <p className="text-xl">Hello there</p>
        <p className="text-2xl font-semibold text-purple">{authUser?.username}</p>
      </NavLink>

      <ul className="flex w-full text-zinc-400 items-center justify-center lg:items-stretch lg:flex-col gap-5 sm:gap-4">
        {navItems.map((item) => (
          <NavbarLink key={item.to} {...item} />
        ))}
      </ul>

      <ConfirmActionModal
        onConfirmFn={logout}
        dialog={"You are going to logout from your account!"}
        onSuccessMessage={"Logged out successfully!"}
        pendingText={"Logging out..."}
        queryToInvalidate={"authUser"}
      >
        <button className="flex ml-5 sm:ml-10 p-2 lg:ml-0 items-center justify-center gap-1 hover:bg-zinc-900 duration-200 lg:py-2 lg:w-full rounded-lg lg:rounded-full">
          <CiLogout className="text-xl" />
          <p className="hidden lg:inline">{isLoggingOut ? "Logging out..." : "Logout"}</p>
        </button>
      </ConfirmActionModal>
    </nav>
  );
};

export default Navbar;

