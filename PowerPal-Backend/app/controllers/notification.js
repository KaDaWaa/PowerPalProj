const {
  getNotificationsByUserId,
  markAllAsRead,
} = require("../services/notification");

module.exports = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await getNotificationsByUserId(req.params.userId);
      res.json(notifications);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  markAllAsRead: async (req, res) => {
    try {
      await markAllAsRead(req.params.userId);
      res.json("All notifications marked as read");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
