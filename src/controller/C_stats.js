const stats = require("../helpers/querySQL");
const db = require("../db/db");

const getAll = async (req, res, next) => {
  const query = req.query;
  const { page = 1, limit = 59 } = query;

  let totalCount = 0;
  const nextOffset = (page - 1) * limit;

  db.serialize(async () => {
    db.all(stats.countAllData, [], function (err, row) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      totalCount = row[0]["COUNT (*)"];
    }).all(stats.getDatabyPage(nextOffset, limit), [], function (err, row) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        data: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          data: row,
        },
      });
    });
  });
};

const getById = async (req, res, next) => {
  const { userId } = req.params;
  let totalCount = 0;

  db.serialize(async () => {
    db.all(stats.countAllDataById, [userId], function (err, row) {
      console.log(row);
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      totalCount = row[0]["COUNT (*)"];
    }).all(stats.getAllStatsbyId, [userId], function (err, row) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        data: {
          totalCount,
          data: row,
        },
      });
    });
  });
};

module.exports = {
  getAll,
  getById,
};
