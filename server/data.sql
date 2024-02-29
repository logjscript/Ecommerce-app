CREATE TABLE user_list(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    items jsonb,
    total DECIMAL(10, 2)
);

INSERT INTO user_list(username, password, items, total) VALUES (
'Logan', 
'password', 
'[]',
0.00
);

