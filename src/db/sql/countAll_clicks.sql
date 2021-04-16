SELECT DISTINCT stats.id,
    stats.first_name,
    stats.last_name,
    stats.email,
    stats.gender,
    stats.ip_adress,
    statistic.user_id,
    SUM(statistic.clicks) AS total_click,
    SUM(statistic.page_views) AS total_page_views
FROM stats
    LEFT OUTER JOIN statistic ON statistic.user_id = stats.id
GROUP BY statistic.user_id
ORDER by stats.id
LIMIT 50 OFFSET 0