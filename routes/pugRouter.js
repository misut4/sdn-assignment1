const express = require("express");
const router = express.Router();

router.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs");
});

router.get("/formPlayer/:_id", (req, res) => {
  res.render("playerForm.ejs");
});

router.get("/formNation/:_id", (req, res) => {
  res.render("nationForm.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

module.exports = router;
