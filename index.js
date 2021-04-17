const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
require("./src/db/db");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.debug("Some debug messages");

const PORT = process.env.PORT || 3010;

const R_stats = require("./src/router/R_stats");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

app.get("/", (_, response) => {
  response.send("Hello world!");
});

app.use("/stats", R_stats);

app.use((err, req, res, next) => {
  if (err.status === 400) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
});

module.exports = app;
