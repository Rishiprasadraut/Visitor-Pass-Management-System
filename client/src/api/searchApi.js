import axiosInstance from "../utils/axiosInstance";

export const findVisitors = (data) => {
  return axiosInstance.post("/visitors/search", data);
};