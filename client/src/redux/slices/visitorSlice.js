import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVisitors } from "../../api/visitorApi";

export const searchVisitors = createAsyncThunk(
    "visitors/search",
    async ({ search = "", status = "", page = 1, limit = 5 }) => {
        const res = await getVisitors({ search, status, page, limit });
        return res.data;
    }
);

const visitorSlice = createSlice({
    name: "visitors",
    initialState: {
        list: [],
        loading: false,
        page: 1,
        totalPages: 1,
        total: 0,
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchVisitors.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchVisitors.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.visitors;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
                state.total = action.payload.total;
            });
    },
});

export default visitorSlice.reducer;
