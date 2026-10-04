drop database if exists sql_store2;

create database if not exists sql_store2;

use sql_store2;

drop table if exists customers;

CREATE TABLE IF NOT EXISTS customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    points INT NOT NULL DEFAULT 0,
    email VARCHAR(255) NOT NULL UNIQUE
);

insert into customers (first_name, email) values ('Yossi', 'arye@gmail.com');

SELECT 
    *
FROM
    customers;

alter table customers
add last_name VARCHAR(50) NOT NULL after first_name,
add city VARCHAR(50) NOT NULL,
modify column first_name VARCHAR(55) default '',
drop points;

insert into customers (last_name, email, city) values ('Danny', 'danny@gmail.com', 'JLM');

SELECT 
    *
FROM
    customers;

-- MySQL CONSTRAINTs are:
-- NOT NULL
-- UNIQUE
-- PRIMARY KEY
-- FOREIGN KEY
-- CHECK (version 8.0.16 and above)
-- DEFAULT


-- relationship
-- 1.{ onDelete : "SET NULL"} If the parent will be deleted it be set to null in its child.
-- 2.{ onDelete : "CASCADE"} If the parent will be deleted it will delete its child.
-- 3.{ onDelete : "DEFAULT"} If the parent will be deleted it will set to default its child.
-- 4.{ onDelete : "RESTRICT"} deleting parent shall be prevented.
-- 5.{ onDelete : "NO ACTION"} same as RESTRICT. 
drop table if exists orders;

CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id)
        REFERENCES customers (customer_id)
        ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Error Code: 1217. Cannot delete or update a parent row: a foreign key constraint fails
drop table if exists customers;

insert into orders (order_id, customer_id) values (1, 1);

SELECT 
    *
FROM
    orders;

UPDATE customers 
SET 
    customer_id = 3
WHERE
    customer_id = 1;

SELECT 
    *
FROM
    orders;

-- Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`sql_store2`.`orders`, CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE NO ACTION ON UPDATE CASCADE)
DELETE FROM customers 
WHERE
    customer_id = 3;
    
-- alter constraint

-- to see the constraints if needed
SHOW CREATE TABLE orders;

alter table orders
	drop  FOREIGN KEY orders_ibfk_1;

-- You have defined a SET NULL condition though some of the columns are defined as NOT NULL.
alter table orders
    add CONSTRAINT `fk_orders_customers`
	    FOREIGN KEY (customer_id)
        REFERENCES customers (customer_id)
        ON UPDATE set null ON DELETE cascade;
        
-- to see the error above, run the below command and look in the LATEST FOREIGN KEY ERROR: 
SHOW ENGINE INNODB STATUS;

alter table orders
	MODIFY customer_id INT,
    add CONSTRAINT `fk_orders_customers`
	    FOREIGN KEY (customer_id)
        REFERENCES customers (customer_id)
        ON UPDATE set null ON DELETE cascade;
        
select * from orders;

update customers set customer_id = 4 where customer_id = 3;

select * from orders;

insert into customers (customer_id, last_name, email, city) values (1, 'Danny', 'danny1@gmail.com', 'JLM');

insert into orders (order_id, customer_id) values (2, 1);

select * from orders;
        
delete from customers where customer_id = 1;

select * from orders;

alter table orders
	drop primary key,
	add another_primary int,
	add primary key pk_orders (order_id, another_primary),
    -- MySQL 8.0.16 Introducing CHECK constraint
    add check (another_primary < 10);
    

insert into orders (order_id, customer_id, another_primary) values (2, 4, 5);

-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`sql_store2`.`orders`, CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE SET NULL)
insert into orders (order_id, customer_id, another_primary) values (5, 5, 6);

insert into customers (customer_id, last_name, email, city) values (5, 'Danny', 'danny2@gmail.com', 'JLM');
insert into customers (customer_id, last_name, email, city) values (10, 'Danny', 'danny3@gmail.com', 'JLM');

select * from customers;

insert into orders (order_id, customer_id, another_primary) values (5, 5, 6);

insert into orders (order_id, customer_id, another_primary) values (8, 10, 11);

select * from orders;





    
    
        

