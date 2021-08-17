//importing modules-->
const User = require("./../models/usersModel");
const mongoose = require("mongoose");
const express = require("express");
//auth handlers
exports.signupUser = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(200).json({
      msg: "success",
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
    res.status(200).json({
      msg: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create an user", error });
  }
};
