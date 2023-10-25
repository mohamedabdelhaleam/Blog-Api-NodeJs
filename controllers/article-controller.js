const express = require("express");
const Article = require("../models/Article");

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
      status: "success",
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
    const article = await Article.findById(id);
    res.json({
      status: "success",
      data: { Article: article },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
const deleteArticle = async (req, res, next) => {
  const id = req.params.articleId;
  try {
    const article = await Article.deleteOne({ _id: id });
    res.json({
      status: "success",
      message: "Article Deleted Successfully",
      data: null,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
const updateArticle = async (req, res, next) => {
  const id = req.params.articleId;
  try {
    const article = await Article.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    console.log(req.body);
    res.json({
      status: "success",
      message: "Article Updated Successfully",
      data: {
        Article : article
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const addArticle = async (req,res,next)=>{
  const title = req.body.title
  const body = req.body.body
  const author = req.body.author
  const likes = req.body.likes
  try {
    const newArticle = new Article()
    newArticle.title = title
    newArticle.body = body
    newArticle.author = author
    newArticle.numberOfLikes = likes
    newArticle.save()
    res.json({
      status: "success",
      message: "Article Added Successfully",
      data: {
        Article : newArticle
      },
    });
    
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  getAllArticle,
  getArticleById,
  addArticle,
  deleteArticle,
  updateArticle,
};
