import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { role } = useSelector((state) => state.auth);

  // Admin side uses Sidebar (ADMIN, SECURITY, EMPLOYEE)
  const isAdminSide = ["ADMIN", "SECURITY", "EMPLOYEE"].includes(role);

  return (
    <>
      {isAdminSide ? (
        // Sidebar Layout
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      ) : (
        // Navbar Layout (for VISITOR role)
        <>
          <Navbar />
          <div className="p-6">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default MainLayout;
