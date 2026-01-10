import axiosInstance from "../utils/axiosInstance";


export const getDashboardStats = () =>
  axiosInstance.get("/visitors/dashboard", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
