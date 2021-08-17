const express = require("express");
const router = express.Router();
//importing controllers-->
const authController = require("../controllers/authController");

//destructuring controllers-->
const { signupUser, loginUser } = authController;

//routing requests-->
/* ------------ */
//adding user and login-->
router.route("/signup").get(signupUser);
router.route("/login").get(loginUser);

module.exports = router;
