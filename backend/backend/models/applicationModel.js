import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  resumeLink: { type: String },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Pending", "Under Review", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
