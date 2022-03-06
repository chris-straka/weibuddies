CREATE DATABASE orders_api;

CREATE TYPE order_status_enum as ENUM ("created", "cancelled", "awaiting:payment", "complete");

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  order_status order_status_enum,
  expires_at DATE,
  username_id INTEGER,
  product_id REFERENCES products(id)
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title VARCHAR(40),
  price smallint
);