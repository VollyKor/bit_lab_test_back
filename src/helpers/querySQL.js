exports.createTableStats =
  "CREATE TABLE IF NOT EXISTS stats( \
            id INTEGER PRIMARY KEY NOT NULL,\
            first_name NVARCHAR(20)  NOT NULL ,\
            last_name NVARCHAR(20)  NOT NULL ,\
            email VARCHAR(320),\
            gender NVARCHAR(16),\
            ip_adress  VARCHAR(20)\
            ) ";

exports.getAllStatsbyId =
  "SELECT * FROM stats \
  INNER JOIN statistic ON statistic.user_id = stats.id\
  WHERE user_id = ? ORDER BY date ASC";

exports.countStats = "select count (*) as amount from stats";
exports.countStatistic = "select count (*) as amount from statistic";

exports.countAllDataById =
  " SELECT COUNT (*) FROM stats\
  INNER JOIN statistic ON statistic.user_id = stats.id WHERE user_id = ?";

exports.countAllData =
  "SELECT COUNT (*) as amount\
    FROM (\
    SELECT SUM(statistic.total_click) AS total_click\
    FROM stats\
    LEFT OUTER JOIN statistic ON statistic.user_id = stats.id\
    GROUP BY statistic.user_id\
    )";

exports.addStat =
  "INSERT INTO stats \
  ( id, first_name, last_name, email, gender, ip_adress) \
  VALUES(?,?,?,?,?,?)";

exports.changeStat = `UPDATE stats SET \
 first_name = ?,\
  last_name = ?, \
  descr = ?,\
  email VARCHAR(320),\
  gender NVARCHAR(16),\
  ip_adress  BINARY,\
  total_click INTEGER\
  total_page_views INTEGER\

  WHERE id = ?`;

exports.createTableStatistic =
  "CREATE TABLE IF NOT EXISTS statistic( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    user_id INTEGER,\
    date DATE, \
    page_views INTEGER,\
    clicks INTEGER,\
    FOREIGN KEY (user_id) REFERENCES stats (id) ON DELETE CASCADE\
    )";

exports.addStatistic =
  "INSERT INTO statistic (user_id, date, page_views, clicks) VALUES (?,?,?,?)";

exports.getAllData =
  "Select * FROM stats INNER JOIN statistic ON statistic.user_id = stats.id";

exports.getSum =
  "SELECT DISTINCT stats.id,\
    stats.first_name,\
    stats.last_name,\
    stats.email,\
    stats.gender,\
    stats.ip_adress,\
    statistic.user_id, \
    SUM(statistic.total_click) AS total_click,\
    SUM(statistic.total_page_views) AS total_page_views\
    FROM stats\
    LEFT OUTER JOIN statistic ON statistic.user_id = stats.id\
    GROUP BY statistic.user_id\
    ORDER by stats.id\
    LIMIT ? OFFSET ?";

// module.exports = {
//   getSum,
//   changeStat,
//   getAllStatsbyId,
//   countAllDataById,
//   getDatabyPage,
//   getAllData,
//   countAllData,
//   createTableStats,
//   createTableStatistic,
//   getAllStats,
//   addStat,
//   addStatistic,
// };
