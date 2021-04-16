const express = require("express");
const router = express.Router();
const C_stats = require("../controller/C_stats");

router.get("/", C_stats.getAll);
router.get("/:userId", C_stats.getById);

module.exports = router;
