import { useMutation } from "@tanstack/react-query";
import { submitSignUp } from "../util/http";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormaData] = useState({
    email: "",
    password: "",
    username: "",
  });
  

  const { mutate, isLoading } = useMutation({
    mutationFn: submitSignUp,
    onSuccess: () => {},
  });

  function handleSubmit(e) {
    e.preventDefault()
    mutate(formData);
  }

  function handleChange(e) {
    setFormaData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <section className="w-full h-screen flex justify-center items-center bg-slate-900">
      <form className="bg-slate-950 p-2 px-5 flex flex-col gap-4 text-zinc-300" onSubmit={handleSubmit}>
        <h1 className="text-xl text-center">Sign up</h1>
        <p className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="bg-transparent border border-zinc-500 px-2 py-1 rounded-lg"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="bg-transparent border border-zinc-500 px-2 py-1 rounded-lg"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="bg-transparent border border-zinc-500 px-2 py-1 rounded-lg"
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </p>
        <button
          className="bg-violet-700 py-1 rounded-md"
        >
          SignUp
        </button>
      </form>
    </section>
  );
};

export default SignUp;
