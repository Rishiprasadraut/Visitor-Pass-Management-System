import axiosInstance from "../utils/axiosInstance";

export const loginUser = (data) => {
   return axiosInstance.post("/auth/login", data);
}


//add by Copilat

export const registerUser = (data) => {
   return axiosInstance.post("/auth/register", data);
}

export const getProfile = () => {
   return axiosInstance.get("/auth/profile");
}

export const checkAdminAccess = () => {
   return axiosInstance.get("/auth/admin");
}

export const checkAdminSecurityAccess = () => {
   return axiosInstance.get("/auth/admin-security");
}