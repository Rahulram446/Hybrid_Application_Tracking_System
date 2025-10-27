import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function ApplicationForm() {
  const [form, setForm] = useState({
    roleName: "",
    roleType: "technical",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/applications/create", form);
      alert("Application submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error creating application");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-[400px] space-y-4"
        >
          <h1 className="text-2xl font-semibold text-center mb-4">
            Submit Application
          </h1>

          <input
            type="text"
            placeholder="Role Name"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, roleName: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, roleType: e.target.value })
            }
          >
            <option value="technical">Technical</option>
            <option value="non-technical">Non-Technical</option>
          </select>

          <textarea
            placeholder="Job Description"
            className="w-full border p-2 rounded h-24"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
