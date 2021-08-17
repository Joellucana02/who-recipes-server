//importing modules-->
const express = require("express");
const User = require("../models/usersModel");
//user handlers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      msg: "success",
      length: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot get all users", error });
  }
};
exports.getUserbyId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      msg: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot get user", error });
  }
};
