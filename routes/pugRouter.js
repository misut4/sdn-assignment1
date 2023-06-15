const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index.ejs')
}) 

router.get("/formPlayer/:_id", (req, res) => {
    res.render('playerForm.ejs')
}) 

router.get("/formNation/:_id", (req, res) => {
    res.render('nationForm.ejs')
}) 

module.exports = router;
