// backend/routes/userroutes.js
import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (no auth needed)
router.post("/register", registerUser);  // Register a new user
router.post("/login", loginUser);        // Login

// Protected routes
// Only admin can view all users
router.get("/", authMiddleware(["admin"]), getUsers);

export default router;
