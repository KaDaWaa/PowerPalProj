const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  createPost: async (post) => {
    const newPost = new Post({
      title: post.title,
      userId: post.userId,
      content: post.content,
      Likes: [],
    });
    return newPost.save();
  },
  getPosts: async () => {
    return Post.find().populate("userId").populate("Likes");
  },
  getPostById: async (postId) => {
    return Post.findById(postId).populate("userId");
  },
  updatePost: async (postId, post) => {
    return Post.findByIdAndUpdate(postId, post, { new: true });
  },
  deletePost: async (postId) => {
    return Post.findByIdAndDelete(postId);
  },
  likePost: async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
      return "Post not found";
    }
    if (post.Likes.includes(userId)) {
      post.Likes = post.Likes.filter((id) => id != userId);
    } else {
      post.Likes.push(userId);
    }
    return post.save();
  },
  getPostsByUserId: async (userId) => {
    return Post.find({ userId: userId })
      .populate("userId")
      .sort({ createdAt: -1 });
  },
};
