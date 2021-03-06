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
    minlength: 4,
    maxlength: 30,
  }, // String is shorthand for {type: String}
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 6,
    maxlength: 50,
    validate: [validator.isEmail],
  },
  profilePic: String,
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
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
    default: false,
    select: false,
  },
  followers: [String],
  followings: [String],
  date: { type: Date, default: Date.now },
  passwordChangedAt: Date,
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 3000;
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

userSchema.methods.changePasswordAfter = function (JWTTimeStap) {
  if (this.passwordChangedAt) {
    //check if password was changed after token
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, passwordChangedAt);
    return JWTTimestamp < changedTimestamp;
  }
  //otherwise token is valid
  return false;
};
/* ----------------- */
//creating user model-->
const User = mongoose.model("User", userSchema);

module.exports = User;
