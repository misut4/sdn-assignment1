const express = require("express");
const router = express.Router();

const { getRoute, getAllRoute ,postRoute, putRoute, delRoute } = require("../controllers/nationService");

router.get("/:_id", getRoute);
router.get("/", getAllRoute);
router.post("/", postRoute);
router.put("/:_id", putRoute);
router.delete("/:_id", delRoute);

module.exports = router;
