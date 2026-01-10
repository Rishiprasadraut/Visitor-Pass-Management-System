import axiosInstance from "../utils/axiosInstance";

export const createVisitor = (data) => {
    return axiosInstance.post("/visitors", data);
}

export const getVisitor = (params) => {
    return axiosInstance.get("/visitors", { params });
}

export const approveVisitor = (id, status) =>
    axiosInstance.patch(`/visitors/${id}/status`, { status });


export const updateStatus = (id, status) => {
    axiosInstance.patch(`/visitors/${id}/status`, { status })
}

export const checkInVisitor = (id) => {
    axiosInstance.patch(`/visitors/${id}/checkin`);
}

export const checkOutVisitor = (id) => {
    axiosInstance.patch(`/visitors/${id}/checkout`)
}