CREATE TABLE user_list(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR (255)
);

INSERT INTO user_list (email, username, password) VALUES ('ld25@gmail.com', 'logan', 'password');
