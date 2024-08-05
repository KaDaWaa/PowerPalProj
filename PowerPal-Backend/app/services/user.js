const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const {
  createFollowNotification,
  deleteFollowNotification,
  getFollowNotificationBySenderAndReciever,
} = require("./notification");

module.exports = {
  createUser: async (user) => {
    if ((await User.findOne({ username: user.username })) != null)
      return "username already exist";
    else if ((await User.findOne({ email: user.email })) != null)
      return "email already exist";
    console.log(user);
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: await bcrypt.hash(
        `${user.password}${process.env.SECRET_KEY}`,
        10
      ),
      name: user.name,
      bio: "",
      posts: [],
      following: [],
      followers: [],
      achievements: { Squat: 0, Bench: 0, Deadlift: 0, Total: 0 },
    });
    console.log(newUser);
    return newUser.save();
  },
  updateUserPw: async (userId, oldPw, newPw) => {
    const user = await User.findById(userId);
    if (
      await bcrypt.compare(`${oldPw}${process.env.SECRET_KEY}`, user.password)
    ) {
      user.password = await bcrypt.hash(
        `${newPw}${process.env.SECRET_KEY}`,
        10
      );
      return user.save();
    }
    return "old password is not correct";
  },
  login: async (email, password) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      return "email is incorrect";
    }

    if (
      await bcrypt.compare(
        `${password}${process.env.SECRET_KEY}`,
        user.password
      )
    ) {
      return user;
    } else {
      return "password is incorrect";
    }
  },
  searchUsersByUsername: async (username) => {
    return User.find({ username: { $regex: `^${username}`, $options: "i" } });
  },
  addPost: async (userId, postId) => {
    const user = await User.findById(userId);
    user.posts.push(postId);
    return user.save();
  },
  findUserById: async (userId) => {
    return User.findById(userId);
  },
  followUser: async (userId, targetId) => {
    const user = await User.findById(userId);
    const target = await User.findById(targetId);
    if (!user || !target) {
      throw new Error("User not found");
    }
    console.log(userId, targetId);
    if (user.following.includes(targetId)) {
      console.log("removing follow");
      user.following = user.following.filter((id) => id != targetId);
      target.followers = target.followers.filter((id) => id != userId);
      const notif = await getFollowNotificationBySenderAndReciever(
        userId,
        targetId
      );
      if (notif) {
        await module.exports.addOrRemoveNotification(targetId, notif._id);
        await deleteFollowNotification(userId, targetId);
      }
    } else {
      console.log("adding follow");
      user.following.push(targetId);
      target.followers.push(userId);
      const notif = await createFollowNotification({
        reciever: targetId,
        sender: userId,
      });
      console.log(notif);
      await module.exports.addOrRemoveNotification(targetId, notif._id);
    }
    await user.save();
    return target.save();
  },
  updateUser: async (userId, name, bio, achievements) => {
    const user = await User.findById(userId);
    user.name = name;
    user.bio = bio;
    user.achievements = achievements;
    return user.save();
  },
  getFollowingUsersPosts: async (userId, page = 1) => {
    const user = await User.findById(userId).select("following");

    if (!user) {
      throw new Error("User not found");
    }

    const followingIds = user.following;

    // Fetch the posts from the users the user is following
    const posts = await Post.find({ userId: { $in: followingIds } })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .skip((page - 1) * 5) // Skip posts based on the current page
      .limit(5) // Limit the results to 5 posts per page
      .populate("userId"); // Populate userId field to include user details

    return posts;
  },
  addOrRemoveNotification: async (userId, notificationId) => {
    //console.log(userId, notificationId);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.notifications.includes(notificationId)) {
      console.log("removing");
      user.notifications = user.notifications.filter(
        (id) => id.toString() != notificationId.toString()
      );
      console.log(user.notifications);
    } else {
      console.log("adding");
      user.notifications.push(notificationId);
    }
    return user.save();
  },
};
