CREATE DATABASE IF NOT EXISTS restaurant;

USE restaurant;

-- Lag kontakt_info-tabellen for å lagre kundens kontaktinformasjon
CREATE TABLE IF NOT EXISTS contact_info (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    message TEXT,
    PRIMARY KEY (id)
);

-- Lag reservations-tabellen for å lagre reservasjoner
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


INSERT INTO contact_info (name, email, phone, message) 
VALUES ('John Doe', 'john.doe@example.com', '1234567890', 'I would like to make a reservation.');
