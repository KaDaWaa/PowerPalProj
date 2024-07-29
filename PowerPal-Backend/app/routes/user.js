const controller = require("../controllers/user");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/signup", cacheNoStore, controller.signup);
router.post("/login", cacheNoStore, controller.login);
router.put("/updatePassword", cacheNoStore, controller.updateUserPw);
router.get("/:id", cacheNoStore, controller.userById);
router.post("/follow", cacheNoStore, controller.followUser);
router.put("/:id", cacheNoStore, controller.updateUser);
router.get("/searchByName/:username",cacheNoStore,controller.searchUsersByUsername);

module.exports = router;
