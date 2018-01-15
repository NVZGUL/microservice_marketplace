CREATE TABLE IF NOT EXISTS valid_users(
    ID int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    opened_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
);
CREATE TABLE IF NOT EXISTS test(
    id int NOT NULL AUTO_INCREMENT,
    category_num int NOT NULL,
    description varchar(255) NOT NULL,
    price int NOT NULL,
    added_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
);
INSERT INTO valid_users(email) VALUES ("workslavapov@gmail.com");