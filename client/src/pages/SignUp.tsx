import { useState } from "react";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SignUp = () => {
  const [formData, setFormaData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { signUp, signingUp } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signUp(formData);
  }

  function handleChange(e) {
    setFormaData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h1 className="text-4xl mt-8 font-sans">Create an account</h1>
      <p className="text-lg mt-2">Your next chapter starts here!</p>
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
          disabled={signingUp}
          className={`bg-purple ease-in mt-4 py-2 rounded-lg w-full font-semibold ${signingUp ? "bg-purple/60 text-zinc-400" : ""
            }`}
        >
          {signingUp ? "Signing up..." : "Sing up"}
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
    </>
  );
};

export default SignUp;
