const express = require("express");
const jwt = require("jsonwebtoken");

const checkRole = (isAdmin) => async (req, res, next) => {
  if (!req.user) {
    res.render("index.ejs");
  }

  const authCookie = req.headers.cookie;
  let token = authCookie.split("Authorization=")[1];
  token = token.split("; connect.sid=")[0];
  const data = await jwt.verify(token, process.env.SECRET_KEY);
  const hasRole = data.user.isAdmin === isAdmin;
  if (!hasRole) {
    res.render("err.ejs");
  }

  return next();
};

module.exports = checkRole;
