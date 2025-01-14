import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: { type: String, required: false},
  caption: { type: String, required: true },
  photo: { type: String, required: true },
  isLiked: { type: Boolean, default: false },
},{ timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;