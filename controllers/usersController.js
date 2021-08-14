//importing modules-->
const express = require("express");
//user handlers
exports.getAllUsers = async (req, res) => {
  try {
    res.status(400).json({
      msg: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot get all users", error });
  }
};
