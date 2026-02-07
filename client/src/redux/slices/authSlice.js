import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const role = localStorage.getItem("role");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: token || null,
        user: user || null,
        role: role || null,
        isAuthenticated: !!token,
    },
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            // Persist to localStorage
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("role", action.payload.role);
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
        },
    },
});



export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;