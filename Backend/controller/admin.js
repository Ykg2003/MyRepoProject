import bcrypt from "bcryptjs";
import UserModel from "../models/Users.js";

// Centralized Error Handling
const handleError = (res, message, status = 500) => {
  console.error(message);
  res.status(status).json({ message });
};

// Get all users
export const Getuser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, "Internal server error in get user");
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkAdmin = await UserModel.findById(id);

    if (!checkAdmin) {
      return handleError(res, "User not found", 404);
    }

    if (checkAdmin.role === "admin") {
      return handleError(res, "You cannot delete yourself", 409);
    }

    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, "Internal server error in delete user");
  }
};

// Add peon role
export const addPeon = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return handleError(res, "All fields are required", 400);
    }

    const emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
    if (!emailRegex.test(email)) {
      return handleError(res, "Invalid email format", 400);
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return handleError(res, "Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPeon = new UserModel({
      name,
      classname: "N/A",
      email,
      password: hashedPassword,
      role: "peon",
    });

    await newPeon.save();
    res.status(201).json({ message: "Peon added successfully", newPeon });
  } catch (error) {
    handleError(res, "Internal server error while adding peon");
  }
};