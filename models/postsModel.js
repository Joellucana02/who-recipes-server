//importing modules-->
const express = require("express");
const mongoose = require("mongoose");

//defining post schema -->
const postSchema = new mongoose.Schema({
  title: String, // String is shorthand for {type: String}
  pic: String,
  desc: String,
  tags: Array,
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});
//creating post model-->
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
