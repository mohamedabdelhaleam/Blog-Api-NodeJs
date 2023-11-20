const express = require("express");
const Article = require("../models/Article");
const { validationResult } = require("express-validator");
const HttpStatusText = require("../utils/HttpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

const getAllArticle = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const article = await Article.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: HttpStatusText.SUCCESS,
    data: { Article: article },
  });
});

const getArticleById = asyncWrapper(async (req, res, next) => {
  const id = req.params.articleId;
  const article = await Article.findById({ _id: id }, { __v: false });
  if (!article) {
    const error = appError.create(
      "Article Not Found",
      404,
      HttpStatusText.FAIL
    );
    return next(error);
  }
  res.json({
    status: HttpStatusText.SUCCESS,
    data: { Article: article },
  });
});
const deleteArticle = asyncWrapper(async (req, res, next) => {
  const id = req.params.articleId;
  const article = await Article.deleteOne({ _id: id });
  res.json({
    status: HttpStatusText.SUCCESS,
    message: "Article Deleted Successfully",
    data: null,
  });
});
const updateArticle = asyncWrapper(async (req, res, next) => {
  const id = req.params.articleId;
  if (result.isEmpty()) {
    const article = await Article.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    res.json({
      status: HttpStatusText.SUCCESS,
      message: "Article Updated Successfully",
      data: {
        Article: article,
      },
    });
  }
  const error = appError(result.array(), 404, HttpStatusText.ERROR);
  return next(error);
});

const addArticle = asyncWrapper(async (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  const likes = req.body.likes;
  const result = validationResult(req);
  if (result.isEmpty()) {
    const newArticle = new Article();
    newArticle.title = title;
    newArticle.body = body;
    newArticle.author = author;
    newArticle.numberOfLikes = likes;
    newArticle.save();
    res.json({
      status: HttpStatusText.SUCCESS,
      message: "Article Added Successfully",
      data: {
        Article: newArticle,
      },
    });
  }
  const error = appError(result.array(), 404, HttpStatusText.ERROR);
  return next(error);
});

module.exports = {
  getAllArticle,
  getArticleById,
  addArticle,
  deleteArticle,
  updateArticle,
};
