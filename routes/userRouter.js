const express = require("express");
const passport = require("passport");
const router = express.Router();

const { login, logout, register } = require("../controllers/userService");

router.post("/login", passport.authenticate("local"), login);
router.get("/logout", logout);
router.post("/register", register);

module.exports = router;
