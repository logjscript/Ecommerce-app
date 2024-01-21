CREATE TABLE user_list(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR (255)
);

INSERT INTO user_list (username, password) VALUES ('logan', 'password');
