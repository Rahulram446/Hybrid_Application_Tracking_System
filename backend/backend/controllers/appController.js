import Application from "../models/Application.js";

/**
 * ✅ Fetch applications (role-based filtering)
 */
export const getApplications = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "applicant") {
      filter.createdBy = req.user._id;
    } else if (req.user.role === "admin") {
      filter.roleType = { $regex: /^non-technical$/i };
    } else if (req.user.role === "bot") {
      filter.roleType = { $regex: /^technical$/i };
    }

    const applications = await Application.find(filter)
      .populate("createdBy", "username email role")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ [getApplications] Error:", error);
    res.status(500).json({ message: "Failed to load applications" });
  }
};

/**
 * ✅ Create application (accepts both `roleName` and `title`)
 */
export const createApplication = async (req, res) => {
  try {
    const {
      roleName,
      title,
      roleType,
      description,
      applicantPhone,
      applicantAddress,
      applicantDob,
    } = req.body;

    // Use roleName if available, fallback to title or "Untitled Role"
    const finalTitle = roleName?.trim() || title?.trim() || "Untitled Role";

    const newApp = new Application({
      title: finalTitle,
      roleType: roleType || "non-technical",
      description: description || "No description provided",
      applicantPhone: applicantPhone || "N/A",
      applicantAddress: applicantAddress || "N/A",
      applicantDob: applicantDob || "N/A",
      createdBy: req.user._id,
      applicantName: req.user.username,
      applicantEmail: req.user.email,
      history: [],
    });

    await newApp.save();
    res.status(201).json({ message: "✅ Application created successfully", newApp });
  } catch (error) {
    console.error("❌ [createApplication] Error:", error);
    res.status(500).json({ message: "Failed to create application" });
  }
};

/**
 * ✅ Update application (Admin or Bot)
 */
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: "Application not found" });

    if (req.user.role === "admin" && /technical/i.test(app.roleType)) {
      return res
        .status(403)
        .json({ message: "Admin cannot modify technical applications" });
    }

    app.status = status || app.status;
    app.history = app.history || [];
    app.history.push({
      status: app.status,
      updatedBy: req.user.username,
      comment: comment || "",
      timestamp: new Date(),
    });

    await app.save();
    res.json({ message: "Application updated successfully", app });
  } catch (error) {
    console.error("❌ [updateApplication] Error:", error);
    res.status(500).json({ message: "Failed to update application" });
  }
};

/**
 * ✅ Delete application
 */
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApp = await Application.findByIdAndDelete(id);
    if (!deletedApp)
      return res.status(404).json({ message: "Application not found" });

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("❌ [deleteApplication] Error:", error);
    res.status(500).json({ message: "Failed to delete application" });
  }
};

/**
 * ✅ Bot Mimic (auto-updates technical apps)
 */
export const runBotMimic = async (req, res) => {
  try {
    const technicalApps = await Application.find({
      roleType: { $regex: /^technical$/i },
    });

    if (!technicalApps.length) {
      return res.status(200).json({
        message: "No Technical applications found.",
        updatedCount: 0,
      });
    }

    const statuses = ["Applied", "Reviewed", "Interview", "Offer", "Completed"];
    let updatedCount = 0;

    for (const app of technicalApps) {
      app.status = app.status || "Applied";
      app.history = app.history || [];

      const currentIndex = statuses.indexOf(app.status);
      const nextStatus =
        currentIndex === -1
          ? "Applied"
          : statuses[(currentIndex + 1) % statuses.length];

      app.status = nextStatus;
      app.history.push({
        status: nextStatus,
        updatedBy: "Bot Mimic",
        comment: `Bot progressed to ${nextStatus}`,
        timestamp: new Date(),
      });

      await app.save();
      updatedCount++;
    }

    res.status(200).json({
      message: `🤖 Bot Mimic successfully updated ${updatedCount} Technical applications.`,
      updatedCount,
    });
  } catch (error) {
    console.error("❌ [runBotMimic] Error:", error);
    res.status(500).json({ message: "Bot mimic failed", error: error.message });
  }
};
