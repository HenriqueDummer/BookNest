import { useMutation } from "@tanstack/react-query";
import { queryClient, submitLogIn } from "../util/http";
import { useState } from "react";

const LogIn = () => {
  const [formData, setFormaData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: submitLogIn,
    onSuccess: () => {
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
    <section className="w-full h-screen flex justify-center items-center bg-slate-900">
      <form
        className="bg-slate-950 p-2 px-5 flex flex-col gap-4 text-zinc-300"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-center">Sign in</h1>
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
        <button className="bg-violet-700 py-1 rounded-md">LogIn</button>
      </form>
    </section>
  );
};

export default LogIn;
