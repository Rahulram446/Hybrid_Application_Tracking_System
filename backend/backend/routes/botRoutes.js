// routes/botRoutes.js

const express = require("express");
const router = express.Router();
const { runBotMimic } = require("../controllers/botMimicController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Route to trigger Bot Mimic manually (only BotMimic role can access)
router.post("/run", verifyToken, verifyRole(["BotMimic"]), runBotMimic);

module.exports = router;
