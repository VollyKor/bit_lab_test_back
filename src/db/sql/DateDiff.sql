SELECT *
FROM stats
    INNER JOIN statistic ON statistic.user_id = stats.id
WHERE user_id = ?
ORDER BY date ASC