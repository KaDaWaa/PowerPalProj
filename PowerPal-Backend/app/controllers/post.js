const {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  likePost,
  updatePost,
  getPostsByUserId,
} = require("../services/post");
const {
  findUserById,
  addPost,
  getFollowingUsersPosts,
} = require("../services/user");

module.exports = {
  createPost: async (req, res) => {
    try {
      const { title, userId, content } = req.body;
      if (!(await findUserById(userId))) {
        return res.status(404).json("User not found");
      }
      const newPost = await createPost({ title, userId, content });
      await addPost(userId, newPost._id);
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await getPosts();
      res.json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await getPostById(req.params.id);
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updatePost: async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body);
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await deletePost(req.params.id);
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await likePost(req.params.id, req.body.userId);
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getPostsByUserId: async (req, res) => {
    try {
      const posts = await getPostsByUserId(req.params.id);
      res.json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
