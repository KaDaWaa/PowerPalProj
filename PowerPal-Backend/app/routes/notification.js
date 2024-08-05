const controller = require("../controllers/notification");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/:userId", cacheNoStore, controller.getNotifications);
router.put("/markAsRead/:userId", cacheNoStore, controller.markAllAsRead);
router.get("/isAllRead/:userId", cacheNoStore, controller.isAllRead);

module.exports = router;
