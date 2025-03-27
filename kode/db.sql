CREATE TABLE reservasjoner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15),
    people INT,
    date DATE,
    time TIME
);
