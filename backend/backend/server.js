// server.js

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron"); // Optional: used for scheduled Bot Mimic runs

// Load environment variables
dotenv.config();

const app = express();

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json());
app.use(cors());

// -----------------------------
// Database Connection
// -----------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// -----------------------------
// Route Imports
// -----------------------------
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const botRoutes = require("./routes/botRoutes"); // ✅ New Bot Mimic route

// -----------------------------
// Route Mounting
// -----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bot", botRoutes); // ✅ Added new route

// -----------------------------
// Root Endpoint
// -----------------------------
app.get("/", (req, res) => {
  res.send("🚀 Application Tracking System Backend Running Successfully");
});

// -----------------------------
// Optional: Bot Mimic Scheduler (runs every 5 minutes)
// -----------------------------
const { runBotMimic } = require("./controllers/botMimicController");

cron.schedule("*/5 * * * *", async () => {
  console.log("🤖 Bot Mimic automation triggered (every 5 min)...");
  try {
    await runBotMimic(
      { body: {}, user: { role: "BotMimic" } },
      {
        status: () => ({
          json: () => {},
        }),
      }
    );
  } catch (err) {
    console.error("Bot Mimic Cron Error:", err.message);
  }
});

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
