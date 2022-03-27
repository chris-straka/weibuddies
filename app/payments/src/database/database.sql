CREATE DATABASE payments_api;

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  order_status VARCHAR(30) NOT NULL,
  expires_at DATE NOT NULL,
  user_id INTEGER NOT NULL,
  product_id REFERENCES products(id)
);

CREATE TABLE payments(
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL,
  stripe_id INTEGER UNIQUE NOT NULL
);