//importing modules-->
const User = require("./../models/usersModel");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken"); //info: https://github.com/auth0/node-jsonwebtoken
const promisify = require("util.promisify"); //info: https://www.npmjs.com/package/util.promisify
//auth handlers
/* var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh"); */
let signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signupUser = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);
    res.cookie(`Cookie token name`, token, {
      maxAge: 5000,
      // expires works the same as the maxAge
      expires: new Date("01 12 2021"),
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(201).json({
      msg: "success",
      jwt: token,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create an user", error });
  }
};
exports.loginUser = async (req, res) => {
  try {
    //get email and password from request
    const { email, password } = req.body;
    //check data
    if (!email || !password)
      res.status(400).json({ msg: "no password or email" });
    //find user by email and get password from document || info:https://mongoosejs.com/docs/api.html#schematype_SchemaType-select
    const user = await User.findOne({ email: email }).select("+password");
    //console.log(user);
    //console.log(password);
    if (!user || !(await user.comparePassword(password, user.password))) {
      res.status(400).json({ msg: "no user found" });
    }
    const token = signToken(user._id);
    res.cookie(`Cookie token name`, token);
    res.status(200).json({
      msg: "success",
      jwt: token,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create an user", error });
  }
};
exports.protectRoute = async (req, res, next) => {
  try {
    let token;
    //get token
    if (req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    //console.log(token);
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    // console.log(tokenDecoded);
    const currentUser = await User.findById(tokenDecoded.id);
    if (!currentUser) res.json({ error: "this user does not exist" });
    //check if user changed his password, if so, this token is not valid
    if (currentUser.changePasswordAfter(tokenDecoded.iat)) {
      res.status(400).json({ msg: "invalid token", error });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Cannot access protect route", error });
  }
};
