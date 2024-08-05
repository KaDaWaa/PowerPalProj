const Notification = require("../models/notification");
module.exports = {
  createLikeNotification: async (notification) => {
    const newNotification = new Notification({
      reciever: notification.reciever,
      sender: notification.sender,
      type: "like",
      postId: notification.postId,
    });
    return newNotification.save();
  },
  createFollowNotification: async (notification) => {
    const newNotification = new Notification({
      reciever: notification.reciever,
      sender: notification.sender,
      type: "follow",
    });
    return newNotification.save();
  },
  getNotificationsByUserId: async (userId) => {
    return Notification.find({ reciever: userId })
      .populate("sender")
      .sort({ createdAt: -1 });
  },
  markAllAsRead: async (userId) => {
    return Notification.updateMany({ reciever: userId }, { read: true });
  },
  getLikeNotificationBySenderAndPostId: async (senderId, postId) => {
    return Notification.findOne({
      postId: postId,
      sender: senderId,
      type: "like",
    });
  },
  getFollowNotificationBySenderAndReciever: async (senderId, recieverId) => {
    return Notification.findOne({
      reciever: recieverId,
      sender: senderId,
      type: "follow",
    });
  },
  deleteLikeNotification: async (notifId) => {
    return Notification.findByIdAndDelete(notifId);
  },
  deleteFollowNotification: async (senderId, recieverId) => {
    return Notification.deleteOne({
      sender: senderId,
      reciever: recieverId,
      type: "follow",
    });
  },
  isAllRead: async (userId) => {
    return Notification.find({ reciever: userId, read: false });
  },
};
