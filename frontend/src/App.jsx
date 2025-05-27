import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

import Navbar from "./components/Navbar";

import { getMe } from "./util/http";
import Reading from "./pages/Reading";
import WantToRead from "./pages/WantToRead";
import Read from "./pages/Read";
import Book from "./pages/Book";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./pages/AuthLayout";
import RootLayout from "./pages/RootLayout";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryFn: getMe,
    queryKey: ["authUser"],
    retry: false,
    refetchOnWindowFocus: false,

  });

  if (isLoading)
    return (
      <Loading
        style="h-screen w-full"
        message={"Loading... (This can take a while at first)"}
      />
    );

  return (
    <div className="flex flex-col-reverse lg:flex-row h-dvh">
      <ToastContainer />
      {authUser && <Navbar />}
      <div className="flex flex-1 overflow-auto">
        <Routes>
          {authUser ? (
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/reading" element={<Reading />} />
              <Route path="/want_to_read" element={<WantToRead />} />
              <Route path="/read" element={<Read />} />
              <Route path="/book/:id" element={<Book />} />
            </Route>
          ) : (
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
