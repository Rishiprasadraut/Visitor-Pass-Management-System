import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (roles && !roles.includes(role)) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Access Denied
      </h2>
    );
  }

  return children;
};

export default ProtectedRoute;
