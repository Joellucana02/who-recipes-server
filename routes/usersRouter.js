const express = require("express");
const router = express.Router();
//importing controllers-->
const usersController = require("../controllers/usersController");
const authController = require("./../controllers/authController");
//destructuring controllers-->
const { getAllUsers, getUserbyId, followUser, unfollowUser } = usersController;
const { protectRoute } = authController;
//routing requests
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserbyId);
router.route("/:id/follow").put(protectRoute, followUser);
router.route("/:id/unfollow").put(protectRoute, unfollowUser);

module.exports = router;
