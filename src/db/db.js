const sqlite3 = require("sqlite3");
const path = require("path");
const stats = require("../helpers/querySQL");
sqlite3.verbose();

const dbPath = path.resolve(__dirname, "data_base.db");

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log("error", err.message);
      process.exit(1);
    } else {
      console.log("Connected to the SQlite database.");

      db.serialize(() => {
        db.run(stats.createTableStats, (err) => {
          if (err) console.log(err);
        });
        db.run(stats.createTableStatistic, (err) => {
          if (err) console.log(err);
        });
      });
    }
  }
);

process.on("SIGINT", () => {
  db.close();
  console.log("Connection for db closed and app termination");
  process.exit(1);
});

module.exports = db;
