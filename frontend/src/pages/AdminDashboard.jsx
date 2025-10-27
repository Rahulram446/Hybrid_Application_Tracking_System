import React, { useEffect, useState } from "react";
import API from "../context/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const res = await API.put(`/applications/${id}`, {
        status: statusUpdates[id],
        comment: comments[id],
      });
      alert(res.data.message);
      fetchApplications();
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Failed to update application");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await API.delete(`/applications/${id}`);
      alert(res.data.message);
      fetchApplications();
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">
            Signed in as{" "}
            <span className="text-indigo-700 font-semibold">
              {user?.username || "Admin"}
            </span>
          </span>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Manage Non-Technical Applications
      </h2>

      {/* ✅ Applications Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Job Title</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Loading applications...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center italic py-6 text-gray-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="border-t hover:bg-gray-50">
                  {/* Job Title */}
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {app.title || "Untitled Role"}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded ${
                        app.status === "Applied"
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "Interview"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "Offer"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <select
                      onChange={(e) =>
                        setStatusUpdates({
                          ...statusUpdates,
                          [app._id]: e.target.value,
                        })
                      }
                      defaultValue=""
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">Change Status</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Add comment"
                      onChange={(e) =>
                        setComments({ ...comments, [app._id]: e.target.value })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />

                    <button
                      onClick={() => handleUpdate(app._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(app._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
