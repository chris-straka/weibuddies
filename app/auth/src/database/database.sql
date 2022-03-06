CREATE DATABASE auth_api;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(40),
  password CHAR(62)
);