import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStats } from "../../api/dashboardApi";

export const fetchDashboardStats = createAsyncThunk(
    "dashboard/fetch",
    async (_, thunkAPI) => {
        try {
            const res = await getDashboardStats();
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Error");
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        stats: null,
        loading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state) => {
                state.loading = false;
            });

    },
});

export default dashboardSlice.reducer;
