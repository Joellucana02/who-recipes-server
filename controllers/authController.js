//importing modules-->
const User = require("./../models/usersModel");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken"); //info: https://github.com/auth0/node-jsonwebtoken
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
    res.status(201).json({
      msg: "success",
      jtw: token,
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
    res.status(200).json({
      msg: "success",
      jwt: token,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create an user", error });
  }
};
