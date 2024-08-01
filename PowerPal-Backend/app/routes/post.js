const controller = require("../controllers/post");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/", cacheNoStore, controller.createPost);
router.get("/", cacheNoStore, controller.getPosts);
router.get("/:id", cacheNoStore, controller.getPostById);
router.put("/:id", cacheNoStore, controller.updatePost);
router.delete("/:id", cacheNoStore, controller.deletePost);
router.put("/:id/like", cacheNoStore, controller.likePost);
router.get("/user/:id/", cacheNoStore, controller.getPostsByUserId);

module.exports = router;
