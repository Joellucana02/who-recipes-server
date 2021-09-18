//importing modules-->
const express = require("express");
const Post = require("../models/postsModel");
const User = require("../models/usersModel");
const APIFeatures = require("../utils/ApiFeatures");
//user handlers
exports.getAllPosts = async (req, res) => {
  try {
    const features = new APIFeatures(Post.find({}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const posts = await features.query;
    res.status(200).json({
      msg: "success",
      length: posts.length,
      data: posts,
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
      data: post,
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
    res.status(200).json({ msg: "success", data: post });
  } catch (error) {
    res.status(400).json({ msg: "Cannot create post", error });
  }
};
exports.votePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (!post.votes.includes(user._id)) {
      await post.updateOne({ $push: { votes: user._id } });
      res.status(200).json({ msg: "success", data: post });
    } else {
      await post.updateOne({ $pull: { votes: user._id } });
      res.status(200).json({ msg: "success", data: post });
    }
  } catch (error) {
    res.status(400).json({ msg: "Cannot vote post", error });
  }
};
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (post && user) {
      await post.updateOne({
        $push: {
          comments: [
            {
              body: req.body.comments.body,
              date: Date.now(),
              userId: req.body.userId,
            },
          ],
        },
      });
      res.status(200).json({ msg: "success", data: post });
    }
  } catch (error) {
    res.status(400).json({ msg: "Cannot add comment to this post", error });
  }
};
