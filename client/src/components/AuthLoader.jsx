import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { loginSuccess, logout } from "../redux/slices/authSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // If already loaded from localStorage, skip API call
    if (role) return;
    
    if (!token) return;

    const loadProfile = async () => {
      try {
        const res = await axiosInstance.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(
          loginSuccess({
            token,
            user: res.data,
            role: res.data.role,
          })
        );
      } catch (err) {
        console.error("Auth validation failed:", err);
        dispatch(logout());
      }
    };

    loadProfile();
  }, [dispatch, role]);

  return children;
};

export default AuthLoader;
