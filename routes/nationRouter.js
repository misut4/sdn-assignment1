const express = require("express");
const router = express.Router();
const checkRole = require("../utils/check-role");

const {
  getRoute,
  getAllRoute,
  postRoute,
  putRoute,
  delRoute,
} = require("../controllers/nationService");

router.get("/:_id", getRoute);
router.get("/", getAllRoute);
router.post("/", checkRole(true), postRoute);
router.put("/:_id", checkRole(true), putRoute);
router.delete("/:_id", checkRole(true), delRoute);

module.exports = router;
