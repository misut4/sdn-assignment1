const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  login,
  logout,
  register,
  getInfo,
} = require("../controllers/userService");

router.post("/login", passport.authenticate("local"), login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/info", getInfo);

module.exports = router;
