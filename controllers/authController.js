//importing modules-->
const User = require("./../models/usersModel");
const mongoose = require("mongoose");
const express = require("express");
//auth handlers
exports.signupUser = async (req, res) => {
  try {
    const newUser = await User.create({
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        passwordConfirm = req.body.passwordConfirm,
    });
    res.status(400).json({
      msg: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create an user", error });
  }
};
