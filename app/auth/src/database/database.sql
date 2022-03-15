CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password CHAR(145) NOT NULL
);

-- For faster logins
CREATE INDEX ON users(email);