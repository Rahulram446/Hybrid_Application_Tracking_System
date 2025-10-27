// frontend/src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleCard = ({ emoji, title, desc, onClick }) => (
  <button
    onClick={onClick}
    className="text-left bg-white/8 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 transform-gpu focus:outline-none focus:ring-4 focus:ring-white/25 cursor-pointer"
    aria-label={title}
  >
    <div className="text-6xl mb-4 select-none">{emoji}</div>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-white/90">{desc}</p>
  </button>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // helper to navigate to page or go to login if not authenticated
  const goTo = (path, requiredRole) => {
    // if user not logged in -> send to login first
    if (!user) {
      navigate("/login");
      return;
    }

    // if a role is specified and user doesn't have it, alert + block
    if (requiredRole && user.role !== requiredRole) {
      alert("Access denied — you do not have the required role for that dashboard.");
      return;
    }

    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white text-center relative px-4 py-10">
      {/* Top Login / Register */}
      <div className="absolute top-6 right-6 flex space-x-3 z-20">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-100"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-indigo-600"
        >
          Register
        </button>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Hybrid ATS System</h1>
      <p className="max-w-2xl text-lg mb-12 text-white/90 leading-relaxed">
        A smart, role-based Applicant Tracking System for Applicants, Admins, and the Bot Mimic automation.
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <RoleCard
          emoji="👤"
          title="Applicant"
          desc="Submit job applications, track progress, and view updates in real-time."
          onClick={() => goTo("/applicant", "applicant")}
        />

        <RoleCard
          emoji="⚙️"
          title="Admin"
          desc="Manage non-technical applications, update statuses, and monitor progress with insights."
          onClick={() => goTo("/admin", "admin")}
        />

        <RoleCard
          emoji="🤖"
          title="Bot Mimic"
          desc="Automate technical role updates and simulate human-like workflow progress."
          onClick={() => goTo("/bot", "bot")}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-white/80">© 2025 Hybrid ATS | Powered by MERN + Tailwind</footer>
    </div>
  );
};

export default HomePage;
