import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
// Optional: Install lucide-react or use heroicons for icons
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Link helper to handle closing menu on click (mobile)
  const NavItem = ({ to, children }) => (
    <NavLink 
      to={to} 
      onClick={() => setIsOpen(false)}
      className={({ isActive }) => 
        `block py-2 md:py-0 hover:text-blue-400 transition-colors ${isActive ? "text-blue-400 font-semibold" : ""}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 relative shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Visitor System</h1>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop & Mobile Menu */}
        <div className={`
          absolute md:static top-full left-0 w-full md:w-auto 
          bg-gray-900 md:bg-transparent px-6 md:px-0 pb-6 md:pb-0
          flex flex-col md:flex-row md:items-center gap-4 md:gap-6
          transition-all duration-300 ease-in-out z-50
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"}
        `}>
          
          {(role === "ADMIN" || role === "SECURITY") && (
            <>
              <NavItem to="/dashboard">Dashboard</NavItem>
              <NavItem to="/visitors">Visitor Log</NavItem>
              <NavItem to="/reports">Reports</NavItem>
              <NavItem to="/visitor-history">History</NavItem>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <NavItem to="/audit">Audit Logs</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          )}

          {(role === "EMPLOYEE" || role === "SECURITY") && (
            <NavItem to="/create-visitor">Create Visitor</NavItem>
          )}

          <NavItem to="/profile">Profile</NavItem>

          <button
            onClick={handleLogout}
            className="mt-2 md:mt-0 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full md:w-auto text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;