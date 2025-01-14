import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './db/db.js';
import authRoute from './route/authroute.js';
import adminroute from './route/adminroute.js';
import http from 'http';
import fileUpload from 'express-fileupload';
import postRoute from './route/postroute.js';
import initSocket from './socket/socket.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

// Database connection
const server = http.createServer(app);
const io = initSocket(server);

// Pass Socket.IO instance to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', adminroute);
app.use('/api', postRoute);

// Start server
server.listen(PORT, async () => {
  try {
    await db();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
});