DROP TYPE IF EXISTS status;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS journeys;
DROP TABLE IF EXISTS trains;

CREATE TYPE status AS ENUM ('pending', 'paid', 'canceled');

CREATE TABLE users (
    id          serial,
    email       varchar(40) NOT NULL,
    password    varchar(40) NOT NULL,
    name        char(20),
    PRIMARY KEY (email)
);

CREATE TABLE journeys (
    id                      serial NOT NULL,
    origin                  char(20),
    destination             char(20),
    departure_date          date,
    return_date             date,
    return                  boolean,
    one_way                 boolean,
    num_adults              integer,
    num_children            integer,
    promo                   boolean,
    departure_leaving_from  time,
    departure_leaving_to    time,
    departure_arrival_from  time,
    departure_arrival_to    time,
    return_leaving_from     time,
    return_leaving_to       time,
    return_arrival_from     time,
    return_arrival_to       time,
    price                   decimal,
    booking_code            varchar(10),
    pin_number              integer,
    owner                   varchar(40) REFERENCES users(email),
    status                  status,
    PRIMARY KEY (id)
);

CREATE TABLE trains (
    id                      serial NOT NULL,
    origin                  char(20),
    destination             char(20),
    departure_date          date,
    departure_time          time,
    arrival_time            time,
    PRIMARY KEY (id)
);
