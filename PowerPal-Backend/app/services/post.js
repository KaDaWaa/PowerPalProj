const Post = require("../models/post");
const {
  createLikeNotification,
  createFollowNotification,
  deleteLikeNotification,
  getLikeNotificationBySenderAndPostId,
} = require("./notification");

const { addOrRemoveNotification } = require("./user");

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
    const userLiked = post.Likes.includes(userId);

    if (userLiked) {
      post.Likes = post.Likes.filter((id) => id != userId);
      if (userId != post.userId) {
        const notif = await getLikeNotificationBySenderAndPostId(
          userId,
          postId
        );
        if (notif) {
          await addOrRemoveNotification(notif.reciever, notif._id);
          await deleteLikeNotification(notif._id);
        }
      }
    } else {
      post.Likes.push(userId);
      if (userId != post.userId) {
        const notif = await createLikeNotification({
          reciever: post.userId,
          sender: userId,
          postId: postId,
        });
        await addOrRemoveNotification(notif.reciever, notif._id);
      }
    }
    return (await post.save()).populate("userId");
  },
  getPostsByUserId: async (userId) => {
    return Post.find({ userId: userId })
      .populate("userId")
      .sort({ createdAt: -1 });
  },
};
