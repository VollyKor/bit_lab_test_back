const stats = require("../helpers/querySQL");
const db = require("../db/db");

const getAll = async (req, res, next) => {
  try {
    const query = req.query;
    const { page = 1, limit = 50 } = query;

    let totalCount = 0;
    const nextOffset = (page - 1) * limit;

    db.serialize(async () => {
      db.each(stats.countAllData, [], function (err, { amount }) {
        if (err) return next(err);
        totalCount = amount;
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
    const { dateFrom = "2019-09-00", dateTo = "2020-01-01" } = req.query;

    db.serialize(async () => {
      db.all(
        stats.getAllStatisticsbyId(dateFrom, dateTo),
        [userId],
        function (err, row) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.status(200).json({
            data: row,
          });
        }
      );
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};
