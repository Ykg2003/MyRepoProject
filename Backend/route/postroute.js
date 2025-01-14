import express from 'express';
import { createPost,posts} from '../controller/posts.js';

// Use multer middleware to handle file uploads
const postRoute = express.Router();

// POST route for creating a post with a file upload
postRoute.post('/post',createPost);

// GET route for fetching all posts (no file upload needed here)
 postRoute.get('/posts', posts);

export default postRoute;