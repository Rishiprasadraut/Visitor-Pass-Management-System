import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Visitor System</h1>

      <div className="flex gap-4 items-center">
        {(role === "ADMIN" || role === "SECURITY") && (
          <NavLink to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </NavLink>
        )}

        { (role === "ADMIN" || role === "SECURITY") && (
          <NavLink to="/visitors" className="hover:text-gray-300">
          Visitor Log
        </NavLink>)}

        {role === "ADMIN" && (
          <NavLink to="/audit" className="hover:text-gray-300">
            Audit Logs
          </NavLink>
        )}

        {(role === "ADMIN" || role === "SECURITY") && (
          <NavLink to="/reports" className="hover:text-gray-300">
            Reports
          </NavLink>
        )}

        {(role === "ADMIN" || role === "SECURITY") && (
          <NavLink to="/visitor-history" className="hover:text-gray-300">
            History
          </NavLink>
        )}

         {(role === "EMPLOYEE" || role === "SECURITY") && (
          <NavLink to="/create-visitor" className="hover:text-gray-300">
            Create Visitor
          </NavLink>
        )}

        <NavLink to="/profile" className="hover:text-gray-300">
          Profile
        </NavLink>
      
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
