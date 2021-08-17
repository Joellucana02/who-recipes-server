const express = require("express");
const router = express.Router();
//importing controllers-->
const usersController = require("../controllers/usersController");

//destructuring controllers-->
const { getAllUsers, getUserbyId } = usersController;

//routing requests
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserbyId);

module.exports = router;
