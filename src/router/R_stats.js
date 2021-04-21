const express = require("express");
const router = express.Router();
const C_stats = require("../controller/C_stats");
const {
  validateUserId,
  validateDate,
  validatePagination,
} = require("../helpers/validateMiddleware");

router.get("/", C_stats.getAll);
router.get("/:userId", validateDate, C_stats.getById);

module.exports = router;
