const sqlite3 = require("sqlite3");
const path = require("path");
const sql = require("../helpers/querySQL");
const fs = require("fs");
const util = require("util");
sqlite3.verbose();

const statisticsData = path.resolve(
  process.cwd(),
  "src/data/users_statistic.json"
);
const statsData = path.resolve(process.cwd(), "src/data/users.json");
const dbPath = path.resolve(__dirname, "data_base.db");

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log("error", err.message);
      process.exit(1);
    } else {
      // =============================================================
      //  Create Table Stats
      // =============================================================
      db.run(sql.createTableStats, (err) => {
        if (err) console.log(err);
      });

      // =============================================================
      //  Create Table Statistic
      // =============================================================
      db.run(sql.createTableStatistic, (err) => {
        if (err) console.log(err);
      });

      console.log("Connected to the SQlite database.");
    }
  }
);
// =============================================================
//  Fill Table Stats
// =============================================================
db.serialize(() => {
  db.each(sql.countStats, (err, { amount }) => {
    if (amount !== 0) return;

    const stats = fs.readFileSync(statsData);
    const statsArr = JSON.parse(stats);

    const placeholder = statsArr
      .map(() => "(? , ? , ? , ? , ? , ?)")
      .join(", ");
    const query =
      "INSERT INTO stats ( id, first_name, last_name, email, gender, ip_adress) VALUES " +
      placeholder;

    let flatStats = [];
    statsArr.forEach((obj) => {
      const values = Object.values(obj);
      values.forEach((item) => flatStats.push(item));
    });

    db.run(query, flatStats, function (err) {
      if (err) throw err;
    });
  });
});

console.log("complete 1");

db.serialize(() => {
  db.each(sql.countStatistic, async (err, { amount }) => {
    // console.log(count);
    if (amount !== 0) return;

    const statistics = fs.readFileSync(statisticsData);
    const statisticsArr = JSON.parse(statistics);

    // // =============================================================
    // //  Fill Table Statistic
    // // =============================================================
    db.parallelize(
      statisticsArr.forEach(async (e) => {
        const { user_id, date, page_views = 0, clicks = 0 } = e;

        db.run(
          sql.addStatistic,
          [user_id, date, page_views, clicks],
          function (err) {
            if (err) {
              console.log(err.message);
            }
          }
        );
      })
    );
  });
});

process.on("SIGINT", () => {
  db.close();
  console.log("Connection for db closed and app termination");
  process.exit(1);
});

module.exports = db;
