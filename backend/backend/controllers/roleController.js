// backend/controllers/roleController.js
import Role from "../models/Role.js";

export const createRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin" });
    const { name, roleType = "technical", acceptsApplications = true } = req.body;
    const exists = await Role.findOne({ name });
    if (exists) return res.status(400).json({ message: "Role exists" });
    const r = await Role.create({ name, roleType, acceptsApplications });
    res.status(201).json(r);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};
