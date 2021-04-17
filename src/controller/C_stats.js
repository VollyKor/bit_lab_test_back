const stats = require("../helpers/querySQL");
const db = require("../db/db");

function getFormattedData(dateObj) {
  return dateObj.toISOString().substring(0, 10);
}

function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}

function getNewDataArr(dataArr, from, to) {
  const datesArr = dateRange(from, to);
  const newDataArr = datesArr.map((e) => {
    const dateArrEl = getFormattedData(e);

    const elIndata = dataArr.find((e) => {
      const dateFromUser = getFormattedData(new Date(e.date));
      return dateFromUser === dateArrEl;
    });
    if (elIndata) return elIndata;

    return { clicks: 0, page_views: 0, date: dateArrEl };
  });

  return newDataArr;
}

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
    const { dateFrom = "2019-10-15", dateTo = "2019-10-21" } = req.query;

    db.serialize(async () => {
      db.all(
        stats.getAllStatisticsbyId(dateFrom, dateTo),
        [userId],
        function (err, row) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          console.log(row);
          res.status(200).json({
            data: getNewDataArr(row, dateFrom, dateTo),
            user: row[0],
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
