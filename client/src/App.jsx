import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Visitors from "./pages/Visitors";
import CreateVisitor from "./pages/CreateVisitor";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import AuditLogs from "./pages/AuditLogs";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import VisitorHistory from "./pages/VisitorHistory";
import VisitorRegister from "./pages/VisitorRegister";
import DigitalPass from "./pages/DigitalPass";
import QRScanner from "./pages/QRScanner";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/visitor-register" element={<VisitorRegister />} />
         <Route
            path="/register"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Register />
              </ProtectedRoute>
            }
          />

        {/* Protected Layout */}
        <Route element={<MainLayout />}>
          <Route
            path="/visitors"
            element={
              <ProtectedRoute roles={["ADMIN", "SECURITY", "EMPLOYEE"]}>
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

          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["ADMIN", "SECURITY", "EMPLOYEE", "VISITOR"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute roles={["ADMIN", "SECURITY"]}>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/visitor-history"
            element={
              <ProtectedRoute roles={["ADMIN", "SECURITY"]}>
                <VisitorHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/digital-pass"
            element={
              <ProtectedRoute roles={["VISITOR"]}>
                <DigitalPass />
              </ProtectedRoute>
            }
          />

          <Route
            path="/qr-scanner"
            element={
              <ProtectedRoute roles={["SECURITY"]}>
                <QRScanner />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
