const express = require("express");
const router = express.Router();
//importing controllers-->
const postsController = require("../controllers/postsController");

//destructuring controllers-->
const { getAllPosts, getPostbyId, createPost } = postsController;

//routing requests
router.route("/").get(getAllPosts);
router.route("/:id").get(getPostbyId);
router.route("/").post(createPost);

module.exports = router;
