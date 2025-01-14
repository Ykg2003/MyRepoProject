import jwt from 'jsonwebtoken';
import UserModel from '../models/Users.js';

const isAdmin = async (req, res, next) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment");
        }

        const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        console.log("User fetched from DB:", user);

        if (user.role !== 'admin') {
            return res.status(403).json({ error: "Unauthorized - User is not an admin" });
        }

        req.user = user; // Attach user to the request for further use
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Unauthorized - Token Expired" });
        }
        console.error("Error in isAdmin middleware:", error.message);

        if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default isAdmin;