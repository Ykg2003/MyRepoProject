import bcrypt from "bcryptjs";
import User from '../models/Users.js'
import generateTokenAndSetAsyncStorage from "../utils/generateToken.js";
 // Adjust the path as necessary


// Signup
export const signup = async (req, res) => {
    try {
        const { name, classname, email, password } = req.body;
  
        if (!email || email.trim() === "") {
            return res.status(400).json({ error: "Email is required" });
        }
  
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Signup error: email already exists");
            return res.status(400).json({ error: "Email already registered" });
        }
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const newUser = new User({
            name,
            classname,
            email,
            password: hashedPassword,
        });
  
        await newUser.save();
  
        const token = generateTokenAndSetAsyncStorage(newUser._id, res); // Capture the token here
  
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            classname: newUser.classname,
            token
        });
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

// Login
// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateTokenAndSetAsyncStorage(user._id, res); // Capture the token here

        // Send the response with token and role
        res.status(200).json({
            _id: user._id,
            name: user.name,
            classname: user.classname,
            email: user.email,
            role: user.role, // Include the role here
            token, // Include the token here as well
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error in login controller" });
    }
};


// Logout
export const logout =  async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};