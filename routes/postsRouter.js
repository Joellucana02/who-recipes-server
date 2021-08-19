const express = require("express");
const router = express.Router();
//importing controllers-->
const postsController = require("../controllers/postsController");
const authController = require("./../controllers/authController");

//destructuring controllers-->
const { getAllPosts, getPostbyId, createPost } = postsController;
const { protectRoute } = authController;

//routing requests
router.route("/").get(protectRoute, getAllPosts);
router.route("/").post(protectRoute, createPost);
router.route("/:id").get(getPostbyId);

module.exports = router;
