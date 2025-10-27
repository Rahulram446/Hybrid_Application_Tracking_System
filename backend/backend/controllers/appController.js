// controllers/appController.js
import Application from "../models/applicationModel.js";

// Submit new application
export const submitApplication = async (req, res) => {
  const { applicantName, email, position, resumeLink, submittedBy } = req.body;

  if (!applicantName || !email || !position || !submittedBy) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const application = await Application.create({
      applicantName,
      email,
      position,
      resumeLink,
      submittedBy,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate(
      "submittedBy",
      "name email role"
    );
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const app = await Application.findByIdAndDelete(id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
