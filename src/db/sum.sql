SELECT stats.id,
    stats.first_name,
    stats.last_name,
    stats.email,
    stats.gender,
    stats.ip_adress,
    SUM(statistic.total_click) AS total_click,
    SUM(statistic.total_page_views) AS total_page_views
FROM stats
    LEFT OUTER JOIN statistic ON statistic.user_id = stats.id
GROUP BY statistic.user_id
ORDER by stats.id