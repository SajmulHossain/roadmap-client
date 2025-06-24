import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { axiosSecure } from "../hooks/useAxiosSecure";
import Loading from "./Loading";
import { useNavigate } from "react-router";

const Logout = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const {isLoading} = useQuery({
    queryKey: ["logoutFn", click],
    enabled: click,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure("/auth/logout");
        if (data?.success) {
          toast.success(data?.message);
          navigate('/auth/login')
        }
        return data;
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          "Something went wrong during logout!"
        );
        return error;
      }
    },
  });

  return (
    <button disabled={isLoading} onClick={() => setClick(true)}>
      {isLoading ? <Loading /> : <IoIosLogOut size={24} className="text-sec" />}
    </button>
  );
};

export default Logout;
