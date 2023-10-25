const express = require("express");
const mongoose = require("mongoose");

const articleControllers = require("./controllers/article-controller")

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

app.get("/getAllArticle",articleControllers.getAllArticle);
app.post("/addArticle",articleControllers.addArticle);
app.get("/getSingleArticle/:articleId",articleControllers.getArticleById);
app.delete("/deleteArticle/:articleId",articleControllers.deleteArticle);
app.patch("/updateArticle/:articleId",articleControllers.updateArticle);


app.listen(4000, () => {
  console.log("port Number 4000");
});
