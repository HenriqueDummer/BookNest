import { copyBook, queryClient, shareBook } from "@/util/http";
import { useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { FiLink } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import { useState } from "react";
import type { User } from "@/Types/User";

const navItems = [
  { to: "", label: "Overview" },
  { to: "notes", label: "Notes" },
  { to: "characters", label: "Characters" },
  { to: "community", label: "Community" },
];

const NavbarLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg duration-200 ${
          isActive
            ? "font-semibold bg-dark_bg_third text-text-primary"
            : " text-text-secondary hover:text-text-primary"
        }`
      }
    >
      {label}
    </NavLink>
  </li>
);

type PrivateBookNavbarProps = {
  id: string;
  shared: boolean;
};
const PrivateBookNavbar = ({ id, shared }: PrivateBookNavbarProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const { mutate: share } = useMutation({
    mutationFn: shareBook,
    onSuccess: (data) => {
      toast.success(data.message || "Book shared successfully!", {
        theme: "dark",
        autoClose: 2000,
      });
      console.log(data);
      queryClient.setQueryData(["book", id], () => {
        return data.book;
      });
    },
  });
  return (
    <>
      <ul className="flex bg-dark_bg_sec rounded-lg items-center gap-2 px-3 py-3">
        {navItems.map((navItem) => (
          <NavbarLink key={navItem.label} {...navItem} />
        ))}
      </ul>
      <Button
        onClick={() => share(id)}
        className="gap-3 px-4 !py-5 duration-200 hover:bg-dark_bg_third"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FiLink size={22} />
        {shared ? (hovered ? "Unshare" : "Shared") : "Share"}
        {shared && !hovered && (
          <div className="w-[6px] aspect-square rounded-full bg-green-600"></div>
        )}
        {shared && hovered && (
          <div className="w-[6px] aspect-square rounded-full bg-red-600"></div>
        )}
      </Button>
    </>
  );
};

type PublicBookProps = {
  id: string;
  sharedBy: User;
  authUserId: string;
};
const PublicBookNavbar = ({ id, sharedBy, authUserId }: PublicBookProps) => {
  const { mutate: copy } = useMutation({
    mutationFn: copyBook,
    onSuccess: (data) => {
      toast.success("Book copied successfully!", {
        theme: "dark",
        autoClose: 2000,
      });
      console.log(data);
    },
  });

  console.log(authUserId, sharedBy._id);
  return (
    <>
      <NavLink
        to={`/user/${sharedBy._id}`}
        className="bg-dark_bg_sec p-1 duration-200 flex gap-2 items-center rounded-full hover:bg-dark_bg_third"
      >
        <img
          className="rounded-full w-12 aspect-square"
          src={sharedBy.profileImg}
          alt="user profile picture"
        />
        <p className="text-text-secondary pr-2 text-sm">
          Shared by{" "}
          <span className="text-base text-text-primary">
            {sharedBy.username}
          </span>
        </p>
      </NavLink>
      {sharedBy._id !== authUserId && (
        <Button
          onClick={() => copy(id)}
          className="gap-3 px-4 !py-5 duration-200 hover:bg-dark_bg_third"
        >
          <IoCopyOutline />
          Copy
        </Button>
      )}
    </>
  );
};

type BookNavbarProps = {
  id: string;
  shared: boolean;
  sharedBy: User;
  isPublic: boolean;
  createdBy: string;
  authUserId: string;
};

const BookNavbar = ({
  id,
  shared,
  sharedBy,
  isPublic,
  createdBy,
  authUserId,
}: BookNavbarProps) => {
  return (
    <div className="flex items-center justify-between">
      {isPublic ? (
        <PublicBookNavbar authUserId={authUserId} sharedBy={sharedBy} id={id} />
      ) : (
        <PrivateBookNavbar id={id} shared />
      )}
    </div>
  );
};

export default BookNavbar;
