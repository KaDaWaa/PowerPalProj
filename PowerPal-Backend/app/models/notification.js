const mongoose = require("mongoose");
const { post } = require("..");
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  reciever: { type: Schema.Types.ObjectId, ref: "User" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  type: String,
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = model("Notification", notificationSchema);
module.exports = Notification;
