import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("/admin/applications").then((res) => setApps(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/admin/applications/${id}`, { status });
    setApps((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {apps.map((a) => (
        <div key={a._id} className="p-4 border rounded-lg shadow mb-2">
          <p>{a.roleName} — {a.status}</p>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => updateStatus(a._id, "Reviewed")}
          >
            Mark Reviewed
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => updateStatus(a._id, "Offer")}
          >
            Offer
          </button>
        </div>
      ))}
    </div>
  );
}
