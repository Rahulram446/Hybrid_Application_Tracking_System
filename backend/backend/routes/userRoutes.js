import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// User routes
router.post("/register", registerUser);  // Register a new user
router.post("/login", loginUser);        // Login
router.get("/", getUsers);               // Get all users (no password)

export default router;
