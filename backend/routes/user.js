const express = require("express")
const {isAuthenticated} = require("../middlewares/auth")

const {register,
    login,
    logout
} = require("../controllers/user")
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(isAuthenticated,logout)


module.exports = router