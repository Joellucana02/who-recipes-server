const express = require("express");
const router = express.Router();
//importing controllers-->
const postsController = require("../controllers/postsController");
const authController = require("./../controllers/authController");

//destructuring controllers-->
const { getAllPosts, getPostbyId, createPost, votePost } = postsController;
const { protectRoute } = authController;

//routing requests
router.route("/").get(protectRoute, getAllPosts);
router.route("/").post(protectRoute, createPost);
router.route("/:id").get(getPostbyId);
router.route("/:id/vote").put(protectRoute, votePost);

module.exports = router;
