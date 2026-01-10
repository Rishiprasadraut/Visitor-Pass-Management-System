import axiosInstance from "../utils/axiosInstance";

export const getAuditLogs = () => {
  return axiosInstance.get("/visitors/audit/logs");
};
