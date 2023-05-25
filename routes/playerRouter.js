const express = require("express");
const router = express.Router();

const { getRoute, getAllRoute ,postRoute, putRoute, delRoute } = require("../controllers/playerService");

router.get("/:_id", getRoute);
router.get("/", getAllRoute);
router.post("/", postRoute);
router.put("/:_id", putRoute);
router.delete("/:_id", delRoute);

router.get("/form", (req, res) => {
    res.render('form.pug')
}) 

module.exports = router;
