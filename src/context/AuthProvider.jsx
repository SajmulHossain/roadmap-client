import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    const { data } = await axiosSecure("/auth/logout");
    setUser(data.data);
    setLoading(false);
  }

  fetchUser();
},[axiosSecure])

  const data = {
    loading,
    user
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
