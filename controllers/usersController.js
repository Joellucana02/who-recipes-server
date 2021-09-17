//importing modules-->
const express = require("express");
const User = require("../models/usersModel");
const Post = require("./../models/postsModel");
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
      data: user,
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot get user", error });
  }
};
exports.followUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: user._id } });
        res.status(200).json({ msg: "success", user });
      } else if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { followings: user._id } });
        res.status(200).json({ msg: "success", user });
      } else {
        res.status(400).json({ msg: "already follow this user", error });
      }
    } catch (error) {
      res.status(400).json({ msg: "Cannot follow user", error });
    }
  } else {
    res.status(400).json({ msg: "Cannot follow yourself", error });
  }
};

exports.userTimeline = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ userId: user._id });
    res
      .status(200)
      .json({ msg: "success, timeline", length: posts.length, data: posts });
  } catch (error) {
    res.status(400).json({ msg: "Cannot get this user timeline", error });
  }
};
