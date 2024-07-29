const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  bio: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  achievements: {
    Squat: Number,
    Bench: Number,
    Deadlift: Number,
    Total: Number,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
module.exports = User;
