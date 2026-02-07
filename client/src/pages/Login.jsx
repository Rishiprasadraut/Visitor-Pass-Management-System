import React, { useState,useEffect } from "react";
import { loginUser } from "../api/authApi";
import { useDispatch,useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { isAuthenticated, role } = useSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 // 🔥 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    if (isAuthenticated && role) {
      role === "EMPLOYEE"
        ? navigate("/create-visitor")
        : navigate("/dashboard");
    }
  }, [isAuthenticated, role, navigate]);


  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.token;

      const profile = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        loginSuccess({
          token,
          user: profile.data,
          role: profile.data.role,
        })
      );

      alert("login Successful");

      // ✅ ROLE BASED REDIRECT
      if (profile.data.role === "ADMIN" || profile.data.role === "SECURITY") {
        navigate("/dashboard");
      } else if (profile.data.role === "EMPLOYEE") {
        navigate("/create-visitor");
      }
    } catch (err) {
      console.error("Login ERROR", err.response?.data || err.message);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <form
        onSubmit={handlerSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Welcome Back
        </h2>

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-4">
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
