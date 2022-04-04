CREATE DATABASE products_api;

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title VARCHAR(40),
  product_image_url VARCHAR(2083),
  price SMALLINT NOT NULL,
  user_id INTEGER UNIQUE NOT NULL,
  order_id INTEGER UNIQUE
);