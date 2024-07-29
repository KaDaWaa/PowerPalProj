const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: [
    { excTitle: String, sets: [{ reps: Number, weight: Number, rpe: Number }] },
  ],
  Likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Post = model("Post", postSchema);
module.exports = Post;
