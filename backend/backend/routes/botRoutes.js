// backend/routes/botRoutes.js
import express from "express";
import { runBotMimic } from "../controllers/botMimicController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected route: only bot or admin can run mimic
router.post("/run", authMiddleware(["bot", "admin"]), runBotMimic);

export default router;
