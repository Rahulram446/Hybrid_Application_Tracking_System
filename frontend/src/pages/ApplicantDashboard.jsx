import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ApplicantDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("/applications/mine").then((res) => setApps(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {apps.map((a) => (
          <div key={a._id} className="p-4 border rounded-lg shadow">
            <p><b>Role:</b> {a.roleName}</p>
            <p><b>Status:</b> {a.status}</p>
            <p><b>Last update:</b> {new Date(a.updatedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
