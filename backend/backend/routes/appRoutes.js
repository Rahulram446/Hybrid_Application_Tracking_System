import express from "express";
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/appController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateApplication, validateStatusUpdate } from "../middleware/validateMiddleware.js";

const router = express.Router();

// Public routes (GET can be public or protected)
router.get("/", getApplications);

// Protected routes
router.post("/", protect, validateApplication, submitApplication);
router.patch("/:id/status", protect, validateStatusUpdate, updateApplicationStatus);
router.delete("/:id", protect, deleteApplication);

export default router;
