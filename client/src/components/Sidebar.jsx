import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  LayoutDashboard,
  Users,
  FileText,
  History,
  Shield,
  UserPlus,
  QrCode,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileOpen(false);
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  // NavItem component
  const SidebarItem = ({ to, icon: Icon, children }) => (
    <NavLink
      to={to}
      onClick={() => setIsMobileOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      <Icon size={20} className="shrink-0" />
      {!isCollapsed && <span className="whitespace-nowrap">{children}</span>}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md shadow-lg"
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-gray-900 text-white
          flex flex-col shadow-2xl z-40 transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800">
          {!isCollapsed && (
            <h1 className="text-xl font-bold tracking-tight">
              Visitor System
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {/* Dashboard - ADMIN & SECURITY only */}
          {(role === "ADMIN" || role === "SECURITY") && (
            <SidebarItem to="/dashboard" icon={LayoutDashboard}>
              Dashboard
            </SidebarItem>
          )}

          {/* Visitor Log - ADMIN, SECURITY, EMPLOYEE */}
          {(role === "ADMIN" || role === "SECURITY" || role === "EMPLOYEE") && (
            <SidebarItem to="/visitors" icon={Users}>
              Visitor Log
            </SidebarItem>
          )}

          {/* Create Visitor - EMPLOYEE & SECURITY */}
          {(role === "EMPLOYEE" || role === "SECURITY") && (
            <SidebarItem to="/create-visitor" icon={UserPlus}>
              Create Visitor
            </SidebarItem>
          )}

          {/* QR Scanner - SECURITY only */}
          {role === "SECURITY" && (
            <SidebarItem to="/qr-scanner" icon={QrCode}>
              QR Scanner
            </SidebarItem>
          )}

          {/* Reports - ADMIN & SECURITY only */}
          {(role === "ADMIN" || role === "SECURITY") && (
            <SidebarItem to="/reports" icon={FileText}>
              Reports
            </SidebarItem>
          )}

          {/* History - ADMIN & SECURITY only */}
          {(role === "ADMIN" || role === "SECURITY") && (
            <SidebarItem to="/visitor-history" icon={History}>
              History
            </SidebarItem>
          )}

          {/* Audit Logs - ADMIN only */}
          {role === "ADMIN" && (
            <SidebarItem to="/audit" icon={Shield}>
              Audit Logs
            </SidebarItem>
          )}

          {/* Register User - ADMIN only */}
          {role === "ADMIN" && (
            <SidebarItem to="/register" icon={UserPlus}>
              Register User
            </SidebarItem>
          )}

          {/* Profile - All roles */}
          <SidebarItem to="/profile" icon={UserCircle}>
            Profile
          </SidebarItem>
        </nav>

        {/* Footer - Logout Button */}
        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
