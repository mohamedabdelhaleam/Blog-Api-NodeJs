const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article");

const app = express();

mongoose
  .connect(
    "mongodb+srv://halim:09930145@cluster0.r31iapu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connection");
  })
  .catch((error) => {
    console.log("error : ", error);
  });

app.use(express.json());

app.get("/getAllArticle",);

app.get("/", (req, res) => {
  res.json({
    status: "success",
  });
});

app.listen(4000, () => {
  console.log("port Number 4000");
});
