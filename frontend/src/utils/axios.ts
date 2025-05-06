
import axios from "axios";
import { API_ENDPOINTS } from "../constants/endpoints";

const axiosInstance = axios.create({
  baseURL: "/", 
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest.url?.includes(API_ENDPOINTS.SIGN_IN) ||
      originalRequest.url?.includes(API_ENDPOINTS.SIGN_UP);

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh-token') &&
      !isAuthRoute 
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post(API_ENDPOINTS.REFRESH);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log('Refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
