import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

import connectDB from "../config/db.js";
import Application from "../models/applicationModel.js";
import User from "../models/userModel.js";

// ✅ Load environment variables from the correct location
dotenv.config({ path: "../.env" }); // Adjust path since you’re in /scripts folder

// ✅ Connect to MongoDB safely
const connectDatabase = async () => {
  try {
    await connectDB(); // your db.js handles the actual mongoose.connect()
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

const generateApplications = async (num = 10) => {
  try {
    await connectDatabase();

    const users = await User.find();
    if (!users.length) {
      console.log("⚠️  No users found. Please create at least one user first.");
      process.exit();
    }

    const applications = [];

    for (let i = 0; i < num; i++) {
      const user = users[Math.floor(Math.random() * users.length)];

      applications.push({
        applicantName: faker.person.fullName() + ` ${Date.now()}`,
        email: faker.internet.email(),
        position: faker.person.jobTitle(),
        resumeLink: faker.internet.url(),
        submittedBy: user._id,
      });
    }

    await Application.insertMany(applications);
    console.log(`✅ ${num} applications created successfully`);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding applications:", error);
    process.exit(1);
  }
};

// Run the seeding
generateApplications(20);
