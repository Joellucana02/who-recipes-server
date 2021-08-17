const express = require("express");
const router = express.Router();
//importing controllers-->
const authController = require("../controllers/authController");

//destructuring controllers-->
const { signupUser, loginUser } = authController;

//routing requests-->
/* ------------ */
//adding user and login-->
router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);

module.exports = router;
