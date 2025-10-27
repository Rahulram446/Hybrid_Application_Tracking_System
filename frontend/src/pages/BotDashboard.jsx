import React, { useEffect, useState } from "react";
import API from "../context/axios";
import { useAuth } from "../context/AuthContext";

const BotDashboard = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    reviewed: 0,
    interview: 0,
    offer: 0,
    completed: 0,
  });

  // ✅ Fetch only technical applications (case-insensitive)
  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      const technicalApps = res.data.filter(
        (a) => a.roleType?.toLowerCase() === "technical"
      );
      setApplications(technicalApps);
      calculateStats(technicalApps);
    } catch (error) {
      console.error("❌ Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (apps) => {
    setStats({
      total: apps.length,
      reviewed: apps.filter((a) => a.status === "Reviewed").length,
      interview: apps.filter((a) => a.status === "Interview").length,
      offer: apps.filter((a) => a.status === "Offer").length,
      completed: apps.filter((a) => a.status === "Completed").length,
    });
  };

  const handleBotMimic = async () => {
    setProcessing(true);
    try {
      const res = await API.post("/bot/mimic");
      alert(res.data.message);
      await fetchApplications();
    } catch (error) {
      console.error("❌ Bot mimic failed:", error);
      alert("Bot mimic failed. Check backend logs.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Bot Mimic Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBotMimic}
            disabled={processing}
            className={`px-4 py-2 rounded text-white ${
              processing ? "bg-gray-500" : "bg-gray-700 hover:bg-gray-800"
            }`}
          >
            {processing ? "Processing..." : "Run Bot Mimic"}
          </button>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Stat label="Total" value={stats.total} color="text-indigo-600" />
        <Stat label="Reviewed" value={stats.reviewed} color="text-amber-600" />
        <Stat label="Interview" value={stats.interview} color="text-purple-600" />
        <Stat label="Offer" value={stats.offer} color="text-green-600" />
        <Stat label="Completed" value={stats.completed} color="text-blue-600" />
      </div>

      {/* Technical Applications */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Technical Applications
      </h2>

      {loading ? (
        <p className="text-gray-500 italic">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500 italic">No technical applications found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow rounded-lg p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {app.title}
              </h3>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Status:</strong> {app.status}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Role Type:</strong> {app.roleType}
              </p>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">History:</p>
                {app.history?.length ? (
                  <ul className="text-sm text-gray-600 max-h-24 overflow-auto">
                    {app.history.map((h, i) => (
                      <li key={i} className="border-l-2 border-gray-200 pl-2 mb-1">
                        {h.status} — <span className="italic">{h.comment}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 italic">No updates yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value, color }) => (
  <div className="bg-white shadow rounded-lg p-4 text-center border border-gray-100">
    <h3 className="text-sm text-gray-500 font-medium">{label}</h3>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

export default BotDashboard;
