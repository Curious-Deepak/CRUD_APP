-- Create Database
CREATE DATABASE IF NOT EXISTS crud_app;
USE crud_app;

-- Drop Items Table if exists
DROP TABLE IF EXISTS items;

-- Create Items Table
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO items (name, description, price) VALUES
('Laptop', 'High-performance laptop for work and gaming', 99999),
('Mouse', 'Wireless ergonomic mouse', 2999),
('Keyboard', 'Mechanical gaming keyboard with RGB', 12999),
('Monitor', '27-inch 4K Ultra HD display', 24999),
('Webcam', '1080p HD webcam with microphone', 6999);

