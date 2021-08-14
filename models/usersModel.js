//importing modules-->
const express = require("express");
const mongoose = require("mongoose");

//defining user schema -->
const userSchema = new mongoose.Schema({
  username: String, // String is shorthand for {type: String}
  email: String,
  profilePic: String,
  password: String,
  passwordConfirm: String,
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});
//creating user model-->
const User = mongoose.model("User", userSchema);

module.exports = User;
