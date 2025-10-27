// controllers/botMimicController.js

const Application = require("../models/Application");

// Bot Mimic Controller: Handles automated updates for technical role applications
exports.runBotMimic = async (req, res) => {
  try {
    // Fetch all technical applications that are not yet in final stage
    const applications = await Application.find({
      roleType: "technical",
      status: { $ne: "Offer" },
    });

    if (!applications.length) {
      return res.status(200).json({
        message: "No technical applications found for update",
      });
    }

    // Define the automated workflow stages
    const statusFlow = ["Applied", "Reviewed", "Interview", "Offer"];

    let updatedApps = [];

    for (const app of applications) {
      const currentIndex = statusFlow.indexOf(app.status);
      if (currentIndex !== -1 && currentIndex < statusFlow.length - 1) {
        const nextStatus = statusFlow[currentIndex + 1];

        // Update application status
        app.status = nextStatus;

        // Push new entry to activity/history logs
        app.history.push({
          actor: "Bot Mimic",
          comment: `Automatically progressed to ${nextStatus}`,
          timestamp: new Date(),
        });

        await app.save();
        updatedApps.push({
          id: app._id,
          newStatus: nextStatus,
        });
      }
    }

    return res.status(200).json({
      message: "Bot Mimic automation completed successfully",
      updatedCount: updatedApps.length,
      updatedApplications: updatedApps,
    });
  } catch (error) {
    console.error("Bot Mimic Error:", error.message);
    return res.status(500).json({
      error: "Internal Server Error while running Bot Mimic",
      details: error.message,
    });
  }
};
