-- Database and tables for the node + mysql demo.
-- Run with: mysql -u root -p < db/schema.sql

CREATE DATABASE IF NOT EXISTS store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE store;

-- Matches the Customer model: firstName, lastName, email, points
CREATE TABLE IF NOT EXISTS customers (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50)  NOT NULL,
  last_name  VARCHAR(50)  NOT NULL,
  email      VARCHAR(100) NOT NULL,
  points     INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_customers_email (email)
);

-- Sample data
INSERT INTO customers (first_name, last_name, email, points) VALUES
  ('Yossi', 'Arye',  'yossi@example.com', 100),
  ('Dana',  'Levi',  'dana@example.com',  250),
  ('Moshe', 'Cohen', 'moshe@example.com', 40);
