import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_prod_api
    : import.meta.env.VITE_development_api,
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await axiosSecure("/auth/logout").then(data => toast.success(data.data.message)).catch(err => toast.error(err?.message || "Something went wrong"))
          toast.error("Unauthorized access identified!");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
