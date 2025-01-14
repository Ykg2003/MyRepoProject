import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/PostSchema.js';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'duexltwsr',
  api_key: '784765641644414',
  api_secret: 'b3RcfnkEK6DxckH0nkS81ETYVbY',
});

// Create Post
export const createPost = async (req, res) => {
  try {
    
    const file = req.files?.['Post '] || req.files?.Post;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }



    // Upload file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath);

    const { caption, name } = req.body; // Extract caption and username from request body

    // Create a new post with the Cloudinary URL
    const newPost = new Post({
      name,
      caption,
      photo: uploadResponse.secure_url, // Store the Cloudinary URL in MongoDB
    });

    await newPost.save();
    req.io.emit('newPost', newPost);



    res.status(201).json({
      message: 'Post created successfully',
      newPost,
    });
  } catch (error) {
    console.error('Error in createPost:', error.stack);
    res.status(500).json({ error: error.message || 'Server error when creating post' });
  }
};

// Fetch Posts
export const posts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Fetch all posts sorted by creation date
    res.status(200).json(posts); // Return posts as JSON
  } catch (error) {
    console.error('Error fetching posts:', error.stack);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};