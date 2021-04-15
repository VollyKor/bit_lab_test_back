const createError = require("http-errors");
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
