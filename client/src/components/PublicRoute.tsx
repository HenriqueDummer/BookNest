import useAuth from "../hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const PublicRoute = ({ children }) => {
  const { authUser, isLoadingUser } = useAuth();

  if (isLoadingUser)
    return (
      <Loading style="h-screen w-full" message={"Checking authentication..."} />
    );

  if (authUser) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
