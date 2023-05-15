const express = require("express");
const router = express.Router();

const { getRoute, getAllRoute ,postRoute, putRoute, delRoute } = require("../controllers/playerService");

router.get("/get", getRoute);
router.get("/getAll", getAllRoute);
router.post("/post", postRoute);
router.put("/put", putRoute);
router.delete("/del", delRoute);

module.exports = router;
