const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  reciever: { type: Schema.Types.ObjectId, ref: "User" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  type: String,
  postId: { type: Schema.Types.ObjectId, ref: "Post", default: null },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = model("Notification", notificationSchema);
module.exports = Notification;
