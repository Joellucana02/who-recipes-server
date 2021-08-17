//importing modules-->
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); /* info: https://github.com/kelektiv/node.bcrypt.js#readme */
const validator = require("validator"); /* info: https://github.com/validatorjs/validator.js */

//defining user schema -->
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  profilePic: String,
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  hidden: {
    type: Boolean,
    default: true,
    select: false,
  },
  meta: {
    votes: Number,
    favs: Number,
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});
//adding middlewares--> ||"schema.prototype.pre" more info: https://mongoosejs.com/docs/api.html#schema_Schema-pre
/* ----------------- */
userSchema.pre("save", async function (next) {
  //cheking if password was modified--> ||"isModified" more info:https://mongoosejs.com/docs/api.html#document_Document-isModified
  if (!this.isModified("password")) return next();
  //hashing password with bcrypt-->
  this.password = await bcrypt.hash(this.password, 12);
  //confirm password field is not more necessary
  this.passwordConfirm = undefined;
  next();
});

/* ----------------- */
//methods for controllers-->
/* ----------------- */
userSchema.methods.comparePassword = async function (
  inputPassword,
  realPassword
) {
  //return a boolean value with bcrypt
  return await bcrypt.compare(inputPassword, realPassword);
};
/* ----------------- */
//creating user model-->
const User = mongoose.model("User", userSchema);

module.exports = User;
