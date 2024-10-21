import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import 'react-toastify/dist/ReactToastify.css';

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

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryFn: getMe,
    queryKey: ["authUser"],
    retry: false
  });

  if(isLoading) return <Loading style="h-screen w-full" />
  
  return (
    <div className="flex h-screen bg-dark_bg">
      <ToastContainer />
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogIn /> : <Navigate to="/" />}
        />
        <Route
          path="/reading"
          element={authUser ? <Reading /> : <Navigate to="/login" />}
        />
        <Route
          path="/want_to_read"
          element={authUser ? <WantToRead /> : <Navigate to="/login" />}
        />
        <Route
          path="/read"
          element={authUser ? <Read /> : <Navigate to="/login" />}
        />
        <Route
          path="/book/:id"
          element={authUser ? <Book /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
