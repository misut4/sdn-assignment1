const userRepository = require("../models/userModel");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(req, res) {
  //   passport.authenticate("local", {
  //     successRedirect: "/users/dashboard",
  //     failureRedirect: "/users/login/",
  //     failureFlash: true,
  //   })(req, res, next);

  try {
    const user = await userRepository.findOne({
      email: req.body.email,
    });

    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = await jwt.sign({ user }, process.env.SECRET_KEY);
        res.cookie("Authorization", token);
        res.render("index.ejs");
      }
    } else {
      res.send("nothing to see here folks");
    }
  } catch (error) {
    console.log(error);
  }
}

async function register(req, res) {
  try {
    const foundUser = await userRepository.findOne({
      email: req.body.email,
    });

    console.log(req.body);
    if (foundUser) {
      res.send("this email is already registered");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await userRepository.create({
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
      });

      res.render("index.ejs");
    }
  } catch (err) {
    console.log(err);
  }
}

async function logout(req, res) {
  res.cookie("Refresh", "");
  res.cookie("Authorization", "");

  res.render("login.ejs");
}

async function authenticate(req, res, next) {
  const token = req.cookie("Authorization");
  await jwt
    .verify(token, process.env.SECRET_KEY)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getInfo(req, res, next) {
  const authCookie = req.headers.cookie;
  let token = authCookie.split("Authorization=")[1];
  token = token.split("; connect.sid=")[0];
  const data = await jwt.verify(token, process.env.SECRET_KEY);

  res.render("user.ejs", { user: data.user });
}

const initializePassport = require("../utils/passport-authencate");
initializePassport(
  passport,
  async (email) => {
    const user = await userRepository.findOne({ email: email });
    return user;
  },
  (id) => (user = userRepository.find({ _id: id }))
);

module.exports = { login, register, logout, authenticate, getInfo };
