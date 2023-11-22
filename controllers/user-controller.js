const express = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/user-model.js");
const HttpStatusText = require("../utils/HttpStatusText.js");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const appError = require("../utils/appError.js");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const page = query.page || 1;
  const limit = query.limit || 8;
  const skip = (page - 1) * limit;

  const user = await User.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({
    status: HttpStatusText.SUCCESS,
    data: { Users: user },
  });
});

const addUser = asyncWrapper(async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const result = validationResult(req);
  if (result.isEmpty()) {
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password;
    newUser.save();
    res.json({
      status: HttpStatusText.SUCCESS,
      message: "User Added Successfully",
      data: {
        User: newUser,
      },
    });
  }
  const error = appError(result.array(), 404, HttpStatusText.ERROR);
  return next(error);
});

const login = asyncWrapper(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = validationResult(req);
  if (result.isEmpty()) {
    const user = await User.findOne(
      { email: email, password: password },
      { __v: false }
    );
    if (!user) {
      const error = appError.create("Login Failed", 404, HttpStatusText.ERROR);
      next(error);
    }
    res.json({
      status: HttpStatusText.SUCCESS,
      message: "Login Successfully",
      data: {
        User: user,
      },
    });
  }
  const error = appError(result.array(), 404, HttpStatusText.ERROR);
  return next(error);
});

module.exports = {
  getAllUsers,
  addUser,
  login,
};
