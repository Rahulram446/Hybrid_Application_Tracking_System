import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import BotDashboard from "./pages/BotDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applicant"
        element={
          <ProtectedRoute roles={["applicant"]}>
            <ApplicantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bot"
        element={
          <ProtectedRoute roles={["bot"]}>
            <BotDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
