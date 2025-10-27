// backend/routes/roleRoutes.js
import express from "express";
import { createRole, getRoles } from "../controllers/roleController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware(["admin"]), createRole);
router.get("/", authMiddleware(["admin","bot","applicant"]), getRoles);
export default router;
