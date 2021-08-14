const express = require("express");
const router = express.Router();
//importing controllers-->
const usersController = require("../controllers/usersController");

//destructuring controllers-->
const { getAllUsers } = usersController;

//routing requests
router.route("/").get(getAllUsers);

module.exports = router;
