import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_prod_api
    : import.meta.env.VITE_development_api,
  // baseURL: import.meta.env.VITE_development_api,
  // baseURL: import.meta.env.VITE_prod_api,
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await axiosSecure("/auth/logout");
          <Navigate to="/auth/login" relative="true" />;
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
