import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (user && !loading) {
    return children;
  }

  return <Navigate to="/auth/login" state={pathname} />
};

export default PrivetRoute;
