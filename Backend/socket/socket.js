import { Server } from 'socket.io';
import Post from '../models/PostSchema.js'; // Import the Post model

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://192.168.1.3:3000", // Use environment variable for better configuration
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Handle connection event
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle newPost event
    socket.on("newPost", (newPost) => {
      console.log("New post received:", newPost);
      // Broadcast the new post to all connected clients
      io.emit("newPost", newPost);
    });

    // Handle likePost event
    socket.on("likePost", async ({ postId }) => {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $set: { isLiked: true } }, // Update the isLiked property
          { new: true } // Return the updated document
        );

        if (!updatedPost) {
          console.error(`Post with ID ${postId} not found.`);
          return;
        }

        // Emit the updated post to all connected clients
        io.emit("postLiked", updatedPost); // Return updatedPost with all properties
        console.log(`Post liked: ${postId}`);
      } catch (error) {
        console.error(`Error updating post: ${error.message}`);
      }
    });

    // Handle client disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

export default initSocket;