import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosSecure("/auth");
        setUser(data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [axiosSecure]);

  const data = {
    loading,
    user,
    setUser,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
