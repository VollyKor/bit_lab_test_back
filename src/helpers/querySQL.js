const createTableStats =
  "CREATE TABLE IF NOT EXISTS stats( \
            id INTEGER PRIMARY KEY NOT NULL,\
            first_name NVARCHAR(20)  NOT NULL ,\
            last_name NVARCHAR(20)  NOT NULL ,\
            email VARCHAR(320),\
            gender NVARCHAR(16),\
            ip_adress  VARCHAR(20)\
            ) ";

const getAllStats = "SELECT * FROM stats";

const getAllStatsbyId =
  "SELECT * FROM stats INNER JOIN statistic ON statistic.user_id = stats.id WHERE user_id = ? ORDER BY date ASC";
const countAllDataById =
  " SELECT COUNT (*) FROM stats INNER JOIN statistic ON statistic.user_id = stats.id WHERE user_id = ?";

// const getStatisticByPage = `Select * FROM stats INNER JOIN statistic ON statistic.user_id = stats.id LIMIT=? OFFSET=? `;

// const getAllData =
//   "Select * FROM stats INNER JOIN statistic ON statistic.user_id = stats.id";

const getDatabyPage = (offset = 0, limit = 50) =>
  `Select * FROM stats INNER JOIN statistic ON statistic.user_id = stats.id LIMIT ${limit} OFFSET ${offset} `;

const countAllData =
  "SELECT COUNT (*) FROM stats INNER JOIN statistic ON statistic.user_id = stats.id";

const addStat =
  "INSERT INTO stats ( id, first_name, last_name,  email, gender, ip_adress) VALUES (?,?,?,?,?,?)";

const changeStat = `UPDATE stats SET \
 first_name = ?,\
  last_name = ?, \
  descr = ?,\
  email VARCHAR(320),\
  gender NVARCHAR(16),\
  ip_adress  BINARY,\
  total_click INTEGER\
  total_page_views INTEGER\

  WHERE id = ?`;

const createTableStatistic =
  "CREATE TABLE IF NOT EXISTS statistic( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    user_id INTEGER,\
    date DATE, \
    total_click INTEGER,\
    total_page_views INTEGER,\
    FOREIGN KEY (user_id) REFERENCES stats (id) ON DELETE CASCADE\
    )";

const addStatistic =
  "INSERT INTO statistic (user_id, date, total_click, total_page_views) VALUES (?,?,?,?)";

const getAllData =
  "Select * FROM stats INNER JOIN statistic ON statistic.user_id = stats.id";

const getSum =
  "SELECT stats.id,\
    stats.first_name,\
    stats.last_name,\
    stats.email,\
    stats.gender,\
    stats.ip_adress,\
    SUM(statistic.total_click) AS total_click,\
    SUM(statistic.total_page_views) AS total_page_views\
    FROM stats\
    LEFT OUTER JOIN statistic ON statistic.user_id = stats.id\
    GROUP BY statistic.user_id\
    ORDER by stats.id\
    LIMIT ? OFFSET ?";

module.exports = {
  getSum,
  changeStat,
  getAllStatsbyId,
  countAllDataById,
  getDatabyPage,
  getAllData,
  countAllData,
  createTableStats,
  createTableStatistic,
  getAllStats,
  addStat,
  addStatistic,
};
