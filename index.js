const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const articleRoutes = require("./routes/article-routes");
const userRoutes = require("./routes/user-routes");
const HttpStatusText = require("./utils/HttpStatusText");

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
app.use(cors());
app.use(express.json());

app.use("/api/Articles", articleRoutes);
app.use("/api/Users", userRoutes);
app.all("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    message: "This Url Not Available",
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 404).json({
    status: error.statusText || HttpStatusText.ERROR,
    message: error.message,
  });
});

app.listen(4000, () => {
  console.log("port Number 4000");
});
