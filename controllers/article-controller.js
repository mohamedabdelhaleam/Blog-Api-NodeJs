const express = require("express");
const Article = require("../models/Article");
const {validationResult } = require('express-validator');
const HttpStatusText = require("../utils/HttpStatusText");

const getAllArticle = async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 8;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  try {
    const article = await Article.find({}, { __v: false })
      .limit(limit)
      .skip(skip);
    res.json({
      status: HttpStatusText.SUCCESS,
      data: { Article: article },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const getArticleById = async (req, res, next) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById({ _id: id }, { __v: false });
    if (!article) {
      res.status(404).json({
        status: HttpStatusText.FAIL,
        data: { Article: article },
      });
    }
    res.json({
      status: HttpStatusText.SUCCESS,
      data: { Article: article },
    });
  } catch (error) {
    res.json({
      status: HttpStatusText.ERROR,
      message: error.message,
    });
  }
};
const deleteArticle = async (req, res, next) => {
  const id = req.params.articleId;
  try {
    const article = await Article.deleteOne({ _id: id });
    res.json({
      status: HttpStatusText.SUCCESS,
      message: "Article Deleted Successfully",
      data: null,
    });
  } catch (error) {
    res.json({
      status: HttpStatusText.ERROR,
      message: error.message,
    });
  }
};
const updateArticle = async (req, res, next) => {
  const id = req.params.articleId;
  const result = validationResult(req)
  if(result.isEmpty()){

    try {
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
    } catch (error) {
      res.json({
        status: HttpStatusText.ERROR,
        message: error.message,
      });
    }
  }
  res.send({ errors: result.array() });
};

const addArticle = async (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  const likes = req.body.likes;
  try {
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
  } catch (error) {
    res.json({
      status: HttpStatusText.ERROR,
      message: error.message,
    });
  }
};

module.exports = {
  getAllArticle,
  getArticleById,
  addArticle,
  deleteArticle,
  updateArticle,
};
