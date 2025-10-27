import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const fetchApps = async () => {
    const res = await API.get("/applications");
    setApplications(res.data);
  };

  const updateApp = async (id) => {
    if (!status) return alert("Select a status");
    await API.put(`/applications/${id}`, { status, comment });
    setComment("");
    setStatus("");
    fetchApps();
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // ======== Chart Data ========
  const total = applications.length;
  const technical = applications.filter((a) => a.roleType === "technical").length;
  const nonTechnical = total - technical;

  const roleData = [
    { name: "Technical", value: technical },
    { name: "Non-Technical", value: nonTechnical },
  ];

  const statusCount = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Applications</h2>
          <p className="text-2xl font-bold mt-2">{total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold">Technical</h2>
          <p className="text-2xl font-bold mt-2 text-blue-600">{technical}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold">Non-Technical</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">{nonTechnical}</p>
        </div>
      </div>

      {/* ===== Charts Section ===== */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        {/* Pie Chart for Role Type */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Applications by Role Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Application Status */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Applications by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Manage Applications ===== */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Applications</h2>
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white border p-4 mb-3 rounded-xl shadow-sm"
          >
            <h3 className="font-semibold">{app.title}</h3>
            <p>Status: {app.status}</p>
            <p>Role Type: {app.roleType}</p>

            <div className="mt-2">
              <select
                className="border p-1 rounded mr-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

              <input
                type="text"
                placeholder="Add comment"
                className="border p-1 rounded mr-2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                onClick={() => updateApp(app._id)}
                className="bg-blue-600 text-white px-2 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
