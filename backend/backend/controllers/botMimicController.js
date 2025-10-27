// backend/controllers/botMimicController.js
import Application from "../models/Application.js";

/**
 * ✅ BOT MIMIC CONTROLLER
 * Automates updates for technical applications.
 */

// Define status progression for technical applications
const STATUS_FLOW = ["Applied", "Reviewed", "Interview", "Offer", "Completed"];

const COMMENTS = [
  "Application reviewed by technical bot.",
  "Interview scheduled by automated system.",
  "Technical interview completed successfully.",
  "Offer generated based on performance.",
  "Application process completed successfully.",
];

export const runBotMimic = async (req, res) => {
  try {
    // ✅ Ensure only bot/admin can run
    if (!req.user || !["bot", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied." });
    }

    // ✅ Find technical applications (case-insensitive)
    const apps = await Application.find({
      roleType: { $regex: /^technical$/i },
      status: { $ne: "Completed" },
    });

    if (!apps || apps.length === 0) {
      return res.status(200).json({
        message: "No pending technical applications found.",
        updatedApps: [],
      });
    }

    const updatedApps = [];

    for (const app of apps) {
      const currentIndex = STATUS_FLOW.indexOf(app.status);
      const nextStatus = STATUS_FLOW[currentIndex + 1];

      // Skip if already at Completed
      if (!nextStatus) continue;

      // Apply new status and push to history
      app.status = nextStatus;
      app.history.push({
        status: nextStatus,
        updatedBy: "bot",
        comment: COMMENTS[currentIndex] || "Automated status update.",
        timestamp: new Date(),
      });

      await app.save();
      updatedApps.push(app);
    }

    res.status(200).json({
      message: `✅ Bot mimic executed successfully. Updated ${updatedApps.length} applications.`,
      updatedApps,
    });
  } catch (error) {
    console.error("❌ Bot Mimic Error:", error);
    res
      .status(500)
      .json({ message: "Bot mimic failed!", error: error.message });
  }
};
