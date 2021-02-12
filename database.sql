CREATE DATABASE santalist;

CREATE TABLE listitems
(
    listitem_id SERIAL PRIMARY KEY,
    name TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zipcode TEXT,
    naughty BOOLEAN,
    nice BOOLEAN
);