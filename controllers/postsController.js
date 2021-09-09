//importing modules-->
const express = require("express");
const Post = require("../models/postsModel");
const User = require("../models/usersModel");
//user handlers
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      msg: "success",
      length: posts.length,
      data: { posts },
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot get all posts", error });
  }
};
exports.getPostbyId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      msg: "success",
      data: { post },
    });
  } catch (error) {
    res.status(400).json({ msg: "Cannot get post", error });
  }
};
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      desc: req.body.desc,
      userId: req.body.userId ? req.body.userId : undefined,
    });
    res.status(200).json({ msg: "success", data: { post } });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create post", error });
  }
};
exports.votePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (!post.votes.includes(user.userId)) {
      await post.updateOne({ $push: { votes: user.userId } });
      res.status(200).json({ msg: "success", data: post });
    } else {
      await post.updateOne({ $pull: { votes: user.userId } });
      res.status(200).json({ msg: "success", data: post });
    }
  } catch (error) {
    res.status(400).json({ msg: "Cannot vote post", error });
  }
};
