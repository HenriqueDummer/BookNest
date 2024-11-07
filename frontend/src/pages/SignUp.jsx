import { useMutation } from "@tanstack/react-query";
import { queryClient, submitSignUp } from "../util/http";
import { useState } from "react";
import { toast } from "react-toastify";

import Logo from "../assets/BookNestLogo.png";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormaData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitSignUp,
    onSuccess: (res) => {
      if (res.error) {
        toast.warn(res.error, { theme: "dark", autoClose: 2000 });
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData);
  }

  function handleChange(e) {
    setFormaData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <section
      style={{
        backgroundImage:
          "url(https://hcommons.org/app/uploads/sites/1001669/2022/10/yin-adapted-2-scaled.jpg)",
      }}
      className="w-full h-screen bg-cover bg-center"
    >
      <div className="w-2/4 flex flex-col justify-center h-screen bg-dark_bg py-10 px-8 text-zinc-300">
        <div className="max-w-[70%]">
          <img className="w-[8rem]" src={Logo} alt="" />
          <h1 className="text-4xl mt-8 font-sans">Your next chapter starts here!</h1>
          <form className=" flex flex-col gap-4 my-10" onSubmit={handleSubmit}>
            <p className="flex flex-col">
              <Label className="text-lg">Email</Label>
              <Input
                className="h-12 mt-2"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </p>
            <p className="flex flex-col">
              <Label className="text-lg">Username</Label>
              <Input
                className="h-12 mt-2"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </p>
            <p className="flex flex-col">
              <Label className="text-lg">Password</Label>
              <Input
                className="h-12 mt-2"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </p>
            <button
              disabled={isPending}
              className={`bg-purple ease-in mt-4 py-2 rounded-lg w-full font-semibold ${
                isPending ? "bg-purple/60 text-zinc-400" : ""
              }`}
            >
              {isPending ? "Signing in..." : "Sing in"}
            </button>
          </form>
          <div className="flex items-center justify-between">
            <p>Already have an account?</p>
            <Link
              to={"/login"}
              className="px-4 py-2 border-2 border-purple rounded-full font-semibold transition-all duration-200 hover:bg-purple"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
