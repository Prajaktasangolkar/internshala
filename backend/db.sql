CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- drop table blue_triangle_clicks;

create table blue_triangle_clicks (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	clicked_at TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY(username) REFERENCES users(username)
);

-- select username,count(username)*10 as points from blue_triangle_clicks where clicked_at BETWEEN NOW() - INTERVAL '1 MINUTES' and NOW() GROUP BY username ORDER BY points DESC;

-- select user_id,count(user_id)*10 as points from blue_triangle_clicks  GROUP BY user_id ORDER BY points DESC;
-- select * from blue_triangle_clicks;