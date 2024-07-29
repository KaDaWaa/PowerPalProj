const User = require("../models/user");
const bcrypt = require("bcrypt");

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
    if (user.following.includes(targetId)) {
      user.following = user.following.filter((id) => id != targetId);
      target.followers = target.followers.filter((id) => id != userId);
    } else {
      user.following.push(targetId);
      target.followers.push(userId);
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
};
