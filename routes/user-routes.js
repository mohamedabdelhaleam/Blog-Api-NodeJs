const express = require("express")
const userController = require("../controllers/user-controller.js")

const router = express.Router()


router.get("/getAllUsers",userController.getAllUsers)
router.post("/signup",userController.addUser)
router.post("/login",userController.login)


module.exports = router