const {
  getNotificationsByUserId,
  markAllAsRead,
  isAllRead,
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
  isAllRead: async (req, res) => {
    try {
      const count = (await isAllRead(req.params.userId)).length;
      if (count === 0) {
        res.json(true);
      } else res.json(false);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
