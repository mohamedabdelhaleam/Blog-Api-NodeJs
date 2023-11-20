const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const articleControllers = require("../controllers/article-controller");

router.get("/getAllArticle", articleControllers.getAllArticle);

router.get("/getAllArticle", articleControllers.getAllArticle);
router.post(
  "/addArticle",
  body("title").notEmpty().escape().isLength({ min: 5, max: 20 }),
  articleControllers.addArticle
);
router.get("/getSingleArticle/:articleId", articleControllers.getArticleById);
router.delete("/deleteArticle/:articleId", articleControllers.deleteArticle);
router.patch(
  "/updateArticle/:articleId",
  body("title").notEmpty().escape().isLength({ min: 5, max: 20 }),
  articleControllers.updateArticle
);

module.exports = router;
