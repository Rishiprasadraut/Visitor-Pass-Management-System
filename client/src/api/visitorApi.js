import axiosInstance from "../utils/axiosInstance";


// GET visitors with search + filter + pagination
export const getVisitors = ({ search, status, page, limit }) => {
    return axiosInstance.post("/visitors/search", {
        search,
        status,
        page,
        limit,
    });
};


export const createVisitor = (data) => {
    return axiosInstance.post("/visitors", data);
}

export const getVisitor = (params) => {
    return axiosInstance.get("/visitors", { params });
}

export const approveVisitor = (id, status) => {
    return axiosInstance.patch(`/visitors/${id}/status`, { status });
}

export const updateStatus = (id, status) => {
    return axiosInstance.patch(`/visitors/${id}/status`, { status:status })
}

export const checkInVisitor = (id) => {
    return axiosInstance.patch(`/visitors/${id}/check-in`);
}

export const checkOutVisitor = (id) => {
    return axiosInstance.patch(`/visitors/${id}/check-out`)
}

// Reports
export const getReportByStatus = (status) => {
    return axiosInstance.post("/visitors/reports/status", { status });
}

export const getReportByDate = (from, to) => {
    return axiosInstance.post("/visitors/reports/date", { from, to });
}

// Visitor History
export const getVisitorHistory = (id) => {
    return axiosInstance.get(`/visitors/${id}/history`);
}