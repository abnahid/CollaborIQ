import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://collabor-iq-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.error(
            "Unauthorized or Forbidden:",
            error.response.data.message
          );
          signOutUser()
            .then(() => navigate("/login"))
            .catch((err) => console.error(err));
        }
        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [navigate, signOutUser]);

  return axiosInstance;
};

export default useAxiosSecure;
