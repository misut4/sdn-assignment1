const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index.pug')
}) 

router.get("/formPlayer", (req, res) => {
    res.render('playerForm.pug')
}) 

router.get("/formNation", (req, res) => {
    res.render('nationForm.pug')
}) 

module.exports = router;
