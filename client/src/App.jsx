import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Visitors from "./pages/Visitors";
import CreateVisitor from "./pages/CreateVisitor";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import AuditLogs from "./pages/AuditLogs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Layout */}
        <Route element={<MainLayout />}>
          <Route
            path="/visitors"
            element={
              <ProtectedRoute roles={["ADMIN", "SECURITY"]}>
                <Visitors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-visitor"
            element={
              <ProtectedRoute roles={["EMPLOYEE", "SECURITY"]}>
                <CreateVisitor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["ADMIN", "SECURITY"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/audit"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AuditLogs />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
