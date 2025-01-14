import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    try {
        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        // Generate JWT
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '15d', // Token expires in 15 days
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw new Error("Failed to generate token");
    }
};

export default generateToken;