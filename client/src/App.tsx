import { Routes, Route } from "react-router-dom";


import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

import Navbar from "./components/Navbar";

import Reading from "./pages/Reading"
import WantToRead from "./pages/WantToRead";
import Read from "./pages/Read";
import Book from "./pages/Book";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./pages/AuthLayout";
import RootLayout from "./pages/RootLayout";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="flex bg-neutral-950 flex-col-reverse lg:flex-row h-dvh">
      <ToastContainer />
      <div className="flex flex-1 overflow-auto">
        <Routes>
          {/* Public routes */}
          <Route
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          >
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          {/* Private routes */}
          <Route
            element={
              <ProtectedRoute>
                <Navbar />
                <RootLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/want_to_read" element={<WantToRead />} />
            <Route path="/read" element={<Read />} />
            <Route path="/book/:id" element={<Book />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
