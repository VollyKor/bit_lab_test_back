SELECT COUNT (*) as amount
FROM (
        SELECT SUM(statistic.clicks) AS total_click
        FROM stats
            LEFT OUTER JOIN statistic ON statistic.user_id = stats.id
        GROUP BY statistic.user_id
    )