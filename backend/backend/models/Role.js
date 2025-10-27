// backend/models/Role.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Frontend Engineer"
  acceptsApplications: { type: Boolean, default: true },
  roleType: { type: String, enum: ["technical", "non-technical"], default: "technical" },
}, { timestamps: true });

export default mongoose.model("Role", roleSchema);
