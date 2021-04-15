const express = require("express");
const router = express.Router();
const C_stats = require("../controller/C_stats");
const path = require("path");
const fs = require("fs");
const db = require("../db/db");
const sql = require("../helpers/querySQL");
const statisticsData = path.resolve(
  process.cwd(),
  "src/data/users_statistic.json"
);
const statsData = path.resolve(process.cwd(), "src/data/users.json");

router.get("/filldb", (req, res, next) => {
  const stats = fs.readFileSync(statsData);
  const statsObj = JSON.parse(stats);

  const statistics = fs.readFileSync(statisticsData);
  const statisticsObj = JSON.parse(statistics);

  db.serialize(() => {
    // statisticsObj.forEach((e, i) => {
    //   const { user_id, date, page_views = 0, clicks = 0 } = e;

    //   db.run(
    //     sql.addStatistic,
    //     [user_id, date, page_views, clicks],
    //     function (err) {
    //       if (err) {
    //         console.log(err.message);
    //         // return res.status(400).json({ error: err.message });
    //       }
    //     }
    //   );
    // });

    statsObj.forEach((e, i) => {
      const {
        id,
        first_name = "unknown",
        last_name = "unknown",
        email = "unknown",
        gender = "unknown",
        ip_address = "unknown",
      } = e;
      db.run(
        sql.addStat,
        [id, first_name, last_name, email, gender, ip_address],
        function (err) {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          // res.status(201).json({
          //   code: 201,
          // });
        }
      );
    });
  });
  next();
});

router.get("/", C_stats.getAll);
router.get("/:userId", C_stats.getById);

module.exports = router;
