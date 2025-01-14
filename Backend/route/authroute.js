import express from "express";
import { signup,login,logout} from '../controller/Auth.js';
const router = express.Router();

// Route for signup
router.post("/signup", signup);

// Route for login
router.post("/login", login);


router.post("/logout",logout);

export default router;