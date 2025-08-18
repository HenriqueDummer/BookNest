import { Outlet } from "react-router-dom";

import Logo from "@/assets/BookNestLogo.png";
import BookBg from "../assets/book_bg.jpg";

const AuthLayout = () => {
  return (
    <section
      className="flex w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]
 from-zinc-800 to-zinc-900"
    >
      <div className="w-full lg:w-2/4 flex flex-col justify-center items-center h-screen py-10 px-8 text-zinc-300">
        <div className="w-full max-w-[34rem]">
          <img className="w-[8rem]" src={Logo} alt="" />
          <Outlet />
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${BookBg})`,
        }}
        className="hidden lg:inline w-2/4 m-2 ml-0 rounded-lg bg-cover bg-center"
      ></div>
    </section>
  );
};

export default AuthLayout;
