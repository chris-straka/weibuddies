CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  order_status VARCHAR(30),
  expires_at DATE,
  user_id INTEGER UNIQUE NOT NULL,
  product_id REFERENCES products(id) ON DELETE CASCADE,
);

CREATE TABLE products(
  id UNIQUE NOT NULL,
  title VARCHAR(40) NOT NULL,
  price SMALLINT NOT NULL,
);