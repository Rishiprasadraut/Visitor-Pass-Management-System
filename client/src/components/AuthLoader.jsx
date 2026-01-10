import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { loginSuccess, logout } from "../redux/slices/authSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        dispatch(logout());
      }
    };

    loadProfile();
  }, [dispatch]);

  return children;
};

export default AuthLoader;
