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
'[
    {"item_name": "item1", "price": "21.99", "img_path": "/thisisIMG1"},
    {"item_name": "item2", "price": "23.99", "img_path": "/thisisIMG2"}
]',
0.00
);

