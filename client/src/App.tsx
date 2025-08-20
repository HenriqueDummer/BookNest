import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UserProfile from "./pages/UserProfile";
import AuthLayout from "./pages/AuthLayout";
import RootLayout from "./pages/RootLayout";

import BooksPage from "./pages/BooksPage";
import Book from "./pages/Book";

import Navbar from "./components/Navbar";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";

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
            <Route path="/" element={<BooksPage title="Public library" />} />
            <Route path="/my_books" element={<BooksPage title="My books" status="all" />} />
            <Route path="/reading" element={<BooksPage title="Reading" status="reading" />} />
            <Route path="/wishlist" element={<BooksPage title="Wishlist" status="wishlist" />} />
            <Route path="/finished" element={<BooksPage title="Finished" status="finished" />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
