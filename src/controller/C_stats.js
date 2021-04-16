const stats = require("../helpers/querySQL");
const db = require("../db/db");

const getAll = async (req, res, next) => {
  try {
    const query = req.query;
    const { page = 1, limit = 50 } = query;

    let totalCount = 0;
    const nextOffset = (page - 1) * limit;

    db.serialize(async () => {
      db.all(stats.countAllData, [], function (err, row) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        totalCount = row[0]["COUNT (*)"];
      }).all(stats.getSum, [limit, nextOffset], function (err, row) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.status(200).json({
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          data: row,
        });
      });
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
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
          totalCount,
          data: row,
        });
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};
