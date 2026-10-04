use sql_invoicing;

select * from clients;

UPDATE invoices 
SET 
    payment_total = payment_total + 1
WHERE
    client_id IN (SELECT 
            client_id
        FROM
            clients
        WHERE
            state IN ('NY' , 'OR'));

select * from invoices;



use sql_store;

-- sub query
insert into sql_hr.employees
(
    employee_id, 
    first_name, 
    last_name, 
    job_title, 
    salary, 
    office_id, 
    reports_to
)
SELECT 
    FLOOR(RAND() * (30000)),
    first_name,
    last_name,
    'Broker',
    10000,
    1,
    37270
FROM
    customers
WHERE
    customer_id IN (SELECT 
            customer_id
        FROM
            orders
        WHERE
            order_id IN (3 , 7));

select * from sql_hr.employees;

-- All products that their price higher than product_id = 3
SELECT 
    *
FROM
    products
WHERE
    unit_price > (SELECT 
            unit_price
        FROM
            products
        WHERE
            product_id = 3);

-- All the products that not ordered
SELECT 
    *
FROM
    products
WHERE
    product_id NOT IN (SELECT DISTINCT
            product_id
        FROM
            order_items);
        
-- subqueries vs join

-- Find all customers (id, firstname, lastname) that ordered product_id = 3, using join
-- option 1
SELECT 
    customer_id, first_name, last_name
FROM
    customers
WHERE
    customer_id IN (SELECT DISTINCT
            customer_id
        FROM
            order_items
                JOIN
            orders USING (order_id)
        WHERE
            product_id = 3);

-- option 2
SELECT DISTINCT
    customer_id, first_name, last_name
FROM
    customers
        JOIN
    orders USING (customer_id)
        JOIN
    order_items USING (order_id)
WHERE
    product_id = 3; 
    
-- Select invoices that are bigger than all client_id = 3 invoices
use sql_invoicing;

SELECT 
    *
FROM
    invoices
WHERE
    invoice_total > (SELECT 
            MAX(invoice_total)
        FROM
            invoices
        WHERE
            client_id = 3);
            
            
SELECT 
    *
FROM
    invoices
WHERE
    invoice_total > ALL (SELECT 
            invoice_total
        FROM
            invoices
        WHERE
            client_id = 3);
            
-- = ANY equals to IN
-- Select all clients that have a least 2 invoices
SELECT 
    *
FROM
    clients
WHERE
    client_id IN (SELECT 
            client_id
        FROM
            invoices
        GROUP BY client_id
        HAVING COUNT(*) > 1);

SELECT 
    *
FROM
    clients
WHERE
    client_id = ANY (SELECT 
            client_id
        FROM
            invoices
        GROUP BY client_id
        HAVING COUNT(*) > 1);
            
-- Correlated subqueries
use sql_hr;

-- Get all employees that their salary higher than the avarage of the employees in the office
SELECT 
    *
FROM
    employees e
WHERE
    salary > (SELECT 
            avg(salary)
        FROM
            employees
        WHERE
            office_id = e.office_id);
            
-- EXISTS keyward
use sql_invoicing;
-- select all clients that have invoices

-- 1
SELECT 
    client_id
FROM
    clients
WHERE
    client_id IN (SELECT 
            client_id
        FROM
            invoices);

-- 2
SELECT DISTINCT
    client_id
FROM
    clients
        JOIN
    invoices USING (client_id);

-- 3
SELECT 
    client_id
FROM
    clients c
WHERE
    EXISTS( SELECT 
            client_id
        FROM
            invoices
        WHERE
            client_id = c.client_id);
            
-- subqueries in the select clause

SELECT 
    invoice_id,
    invoice_total,
    (SELECT 
            AVG(invoice_total)
        FROM
            invoices) AS average,
    (invoice_total - (SELECT average)) AS diff
FROM
    invoices;
    
-- subqueries in the from clause
SELECT 
    *
FROM
    (
        SELECT 
            invoice_id,
            invoice_total,
            (SELECT 
                    AVG(invoice_total)
                FROM
                    invoices) AS average,
            (invoice_total - (SELECT average)) AS diff
        FROM
            invoices
    ) AS invoices_summary
JOIN
    payments USING (invoice_id)
    

