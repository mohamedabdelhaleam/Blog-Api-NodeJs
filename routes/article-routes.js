
const express = require('express')

const router = express.Router()
const articleControllers = require("../controllers/article-controller")

router.get("/getAllArticle",articleControllers.getAllArticle)

router.get("/getAllArticle",articleControllers.getAllArticle);
router.post("/addArticle",articleControllers.addArticle);
router.get("/getSingleArticle/:articleId",articleControllers.getArticleById);
router.delete("/deleteArticle/:articleId",articleControllers.deleteArticle);
router.patch("/updateArticle/:articleId",articleControllers.updateArticle);


module.exports = router