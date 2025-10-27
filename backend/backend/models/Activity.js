// backend/models/Activity.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
  action: { type: String, required: true },
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String },
  role: { type: String },
  note: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Activity", activitySchema);
