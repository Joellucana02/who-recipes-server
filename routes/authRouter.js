//importing modules-->
const User = require('./../models/usersModel')
const mongoose = require('mongoose')
const express = require("express");
//auth handlers
exports.createUser = async (req, res) => {
  try {
      const user = await new User()

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    res.status(400).json({
      msg: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create an user", error });
  }
};
