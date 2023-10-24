const express = require("express");

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
        status : "success",
        data : {Article : article}
    });
  } catch (error) {
    res.json({
        status : "error",
        message : error.message
    })
  }
};
