CREATE TABLE IF NOT EXISTS contact_info (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    message TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reservations (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    phone VARCHAR(20),
    people INT,
    date DATE,
    time TIME,
    area VARCHAR(50),
    PRIMARY KEY (id)
);
