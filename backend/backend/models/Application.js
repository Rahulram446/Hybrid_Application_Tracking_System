import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  status: String,
  updatedBy: String,
  comment: String,
  timestamp: { type: Date, default: Date.now },
});

const applicationSchema = new mongoose.Schema(
  {
    title: String,
    roleType: String,
    description: String,
    status: { type: String, default: "Applied" },
    applicantName: String,
    applicantEmail: String,
    applicantPhone: String,
    applicantAddress: String,
    applicantDob: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    history: [historySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
