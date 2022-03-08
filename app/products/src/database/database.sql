CREATE DATABASE products_api;

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title VARCHAR(40),
  price smallint,
  userId INTEGER,
  orderId INTEGER
);