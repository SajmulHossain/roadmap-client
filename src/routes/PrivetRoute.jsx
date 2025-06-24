import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  console.log(pathname);

  if (!user && !loading) {
    return <Navigate to="/auth/login" state={pathname} />;
  }

  return children;
};

export default PrivetRoute;
