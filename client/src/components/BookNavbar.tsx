import { copyBook, queryClient, shareBook } from "@/util/http";
import { useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { FiLink } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";

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

type BookNavbar = {
  id: string;
  shared: boolean;
  isPublic: boolean;
  createdBy: string;
  authUserId: string | undefined;
};

const BookNavbar = ({
  id,
  shared,
  isPublic,
  createdBy,
  authUserId,
}: BookNavbar) => {
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
  return (
    <div className="flex items-center justify-between">
      <ul className="flex bg-dark_bg_sec rounded-lg items-center gap-2 px-3 py-3">
        {navItems.map((navItem) => (
          <NavbarLink key={navItem.label} {...navItem} />
        ))}
      </ul>

      {createdBy !== authUserId && isPublic && (
        <Button
          onClick={() => copy(id)}
          className="gap-3 px-2 h-8 lg:px-4 lg:h-10"
        >
          <IoCopyOutline /> Copy
        </Button>
      )}

      {!isPublic && (
        <Button onClick={() => share(id)} className="gap-3 px-4 !py-5">
          <FiLink size={22} />
          {shared ? "Shared" : "Share"}
          {shared && <div className="w-[6px] aspect-square rounded-full bg-green-600"></div>}
        </Button>
      )}
    </div>
  );
};

export default BookNavbar;
