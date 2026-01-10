import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVisitor } from "../../api/visitorApi";

export const fetchVisitors = createAsyncThunk(
    "visitors/fetch",
    async (__dirname, thunkAPI) => {
        const res = await getVisitor();
        return res.data.visitor;
    }
);

const visitorSlice = createSlice({
    name: "visitors",
    initialState: {
        list: [],
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVisitors.pending, (state) => {
            state.loading = true;
        }).addCase(fetchVisitors.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });
    }
})

export default visitorSlice.reducer;