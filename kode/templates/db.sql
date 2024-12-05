CREATE DATABASE tapas;

use tapas;

CREATE TABLE mat (
    id int NOT NULL AUTO_INCREMENT,
    mat VARCHAR(255),
    antall int,
    PRIMARY KEY (id)
)

iNSERT INTO mat (mat, antall) VALUES ("kjøtt", 3)
iNSERT INTO mat (mat, antall) VALUES ("fisk", 5)
iNSERT INTO mat (mat, antall) VALUES ("lefse", 4)


iNSERT INTO bestilling (kundeId, matID) VALUES (1,2);