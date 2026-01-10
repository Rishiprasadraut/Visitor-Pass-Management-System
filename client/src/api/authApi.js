import axiosInstance from "../utils/axiosInstance";

export const loginUser = (data) => {
   return axiosInstance.post("/auth/login", data);
}