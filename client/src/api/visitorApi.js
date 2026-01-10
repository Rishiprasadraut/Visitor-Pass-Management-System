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

export const approveVisitor = (id, status) =>
    axiosInstance.patch(`/visitors/${id}/status`, { status });


export const updateStatus = (id, status) => {
    axiosInstance.patch(`/visitors/${id}/status`, { status })
}

export const checkInVisitor = (id) => {
    axiosInstance.patch(`/visitors/${id}/check-in`);
}

export const checkOutVisitor = (id) => {
    axiosInstance.patch(`/visitors/${id}/check-out`)
}