import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";
import ApplicantDashboard from "./ApplicantDashboard";
import ApplicationForm from "./ApplicationForm";
import BotDashboard from "./BotDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="applicant" element={<ApplicantDashboard />} />
          <Route path="form" element={<ApplicationForm />} />
          <Route path="bot" element={<BotDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
