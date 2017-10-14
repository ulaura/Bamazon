DROP DATABASE IF EXISTS	 bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT(50) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT(50) NULL,
PRIMARY KEY (item_id)
);

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bar soap", "Health and Beauty", 2.50, 20),
("shampoo", "Health and Beauty", 3.50, 15),
("dress shirt", "Clothing", 10.50, 10),
("dress pants", "Clothing", 15.50, 15),
("dry rice", "Dry Goods", 2.00, 25),
("dry beans", "Dry Goods", 1.50, 30),
("bananas", "Produce", 12.00, 25),
("red seedless grapes", "Produce", 7.00, 20),
("sketchbook", "Art Supplies", 18.50, 30),
("drawing pencils", "Art Supplies", 7.50, 30);

USE bamazon;
SELECT * FROM products;

UPDATE products 
SET stock_quantity = stock_quantity - 4
WHERE item_id = 1;

SELECT * FROM prodcuts;