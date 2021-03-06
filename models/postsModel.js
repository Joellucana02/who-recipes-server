//importing modules-->
const express = require("express");
const mongoose = require("mongoose");

//defining post schema -->
const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  desc: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300,
  },
  pic: String,
  tags: [String],
  hidden: {
    type: Boolean,
    default: true,
    select: false,
  },
  votes: [String],
  comments: [
    {
      body: { type: String, maxlength: 300, minlength: 1 },
      date: Date,
      userId: String,
    },
  ],
  date: { type: Date, default: Date.now },
});
//creating post model-->
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
