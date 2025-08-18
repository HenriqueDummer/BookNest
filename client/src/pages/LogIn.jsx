import { useMutation } from "@tanstack/react-query";
import { queryClient, submitLogIn } from "../util/http";
import { useState } from "react";
import { toast } from "react-toastify";

import Logo from "../assets/BookNestLogo.png";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormaData] = useState({
    email: "",
    password: "",
  });

  const { login, isLogginIn } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
  }

  function handleChange(e) {
    setFormaData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h1 className="text-4xl mt-8 font-sans">Sign into your account</h1>
      <p className="text-lg mt-2">Join the story again!</p>

      <form className="flex flex-col gap-4 my-10" onSubmit={handleSubmit}>
        <p className="flex flex-col">
          <Label className="text-lg">Email</Label>
          <Input
            className="h-12 mt-2 w-full"
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
          disabled={isLogginIn}
          className={`bg-purple ease-in mt-4 py-2 rounded-lg w-full font-semibold ${
            isLogginIn ? "bg-purple/60 text-zinc-400" : ""
          }`}
        >
          {isLogginIn ? "Logging in..." : "Log in"}
        </button>
      </form>
      <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
        <p>Don't have an account yet?</p>
        <Link
          to={"/signup"}
          className="px-4 py-2 border-2 border-purple rounded-full font-semibold transition-all duration-200 hover:bg-purple"
        >
          Create one
        </Link>
      </div>
    </>
  );
};

export default LogIn;
