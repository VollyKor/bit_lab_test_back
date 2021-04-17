SELECT *
FROM stats
    INNER JOIN statistic ON statistic.user_id = stats.id
WHERE user_id = 3
    and Date between '2019-08-10' and '2019-12-10'
ORDER BY date ASC