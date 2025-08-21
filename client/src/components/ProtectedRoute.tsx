import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoadingUser, userError } = useAuth();

  if (isLoadingUser)
    return (
      <Loading
        style="h-screen w-full"
        message={"Loading... (This can take a while at first)"}
      />
    );

  console.log(authUser, userError);
  if (!authUser || userError) return <Navigate to={"/login"} replace />;

  return children;
};

export default ProtectedRoute;
