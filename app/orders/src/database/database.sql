CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  order_status VARCHAR(30),
  expires_at DATE,
  user_id INTEGER,
  product_id REFERENCES products(id)
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title VARCHAR(40),
  price smallint
);