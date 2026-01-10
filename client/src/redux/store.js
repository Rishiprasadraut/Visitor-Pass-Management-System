import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import visitorReducer from "./slices/visitorSlice";
import dashboardReducer from "./slices/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,      // ✅ MUST be "auth"
    visitors: visitorReducer,
    dashboard: dashboardReducer
  },
});

export default store;
