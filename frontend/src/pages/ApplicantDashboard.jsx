import React, { useState, useEffect } from "react";
import API from "../context/axios";
import { useAuth } from "../context/AuthContext";

const ApplicantDashboard = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    roleName: "",
    roleType: "technical",
    description: "",
    phone: "",
    address: "",
    dob: "",
  });

  // ✅ Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (error) {
      console.error("❌ Failed to load applications", error);
    }
  };

  // ✅ Form change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit new application
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.roleName.trim()) {
      alert("Please enter a valid Job Title before submitting.");
      return;
    }

    try {
      await API.post("/applications", {
        roleName: form.roleName,
        roleType: form.roleType,
        description: form.description,
        applicantPhone: form.phone,
        applicantAddress: form.address,
        applicantDob: form.dob,
      });

      alert("✅ Application submitted successfully!");
      setForm({
        roleName: "",
        roleType: "technical",
        description: "",
        phone: "",
        address: "",
        dob: "",
      });
      fetchApplications();
    } catch (error) {
      console.error("❌ Failed to create application", error);
      alert("Failed to create application");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* 🧭 Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Applicant Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">
            Signed in as{" "}
            <span className="text-indigo-600">{user?.username}</span>
          </span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 📝 Application Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-3xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Submit Application
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Job Title */}
          <input
            type="text"
            name="roleName"
            value={form.roleName}
            onChange={handleChange}
            placeholder="Enter Job Title"
            className="border rounded p-2 w-full"
            required
          />

          {/* Role Type */}
          <select
            name="roleType"
            value={form.roleType}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >
            <option value="technical">Technical</option>
            <option value="non-technical">Non-Technical</option>
          </select>

          {/* Phone */}
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded p-2 w-full"
          />

          {/* Address */}
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border rounded p-2 w-full"
          />

          {/* Date of Birth */}
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter Job Description"
          className="border rounded p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          Submit Application
        </button>
      </form>

      {/* 📋 Applications List */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Your Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 italic">No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border rounded-lg shadow-md p-5 hover:shadow-lg transition"
            >
              {/* ✅ Display Job Title */}
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {app.title && app.title.trim() !== ""
                  ? app.title
                  : "Untitled Role"}
              </h3>

              <p className="text-sm text-gray-700 mb-1">
                <strong>Role Type:</strong> {app.roleType || "N/A"}
              </p>

              <p className="text-sm text-gray-700 mb-1">
                <strong>Applied On:</strong>{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-2">
                <strong>History:</strong>
                {app.history?.length > 0 ? (
                  <ul className="text-sm text-gray-600">
                    {app.history.map((h, i) => (
                      <li key={i}>
                        {h.status} — {h.comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">No updates yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantDashboard;
