import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (!user && !loading) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivetRoute;
