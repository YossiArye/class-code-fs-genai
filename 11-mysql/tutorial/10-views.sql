CREATE VIEW invoices_summary AS
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


SELECT 
    *
FROM
    invoices_summary
        JOIN
    payments USING (invoice_id);
    
-- Drop view
drop view invoices_summary;

-- update view
CREATE OR REPLACE VIEW invoices_summary AS
    SELECT 
        invoice_id,
        invoice_total,
        (SELECT 
                AVG(invoice_total)
            FROM
                invoices) AS average,
        (invoice_total - (SELECT average)) AS diff,
        payment_id,
        amount
    FROM
        invoices
            JOIN
        payments USING (invoice_id);
        
SELECT 
    *
FROM
    invoices_summary;

-- Operations on view
-- We can perform update, delete and insert on a view, in a condition that none of the following included in the view:
-- distinct, aggregations functions & group by, union

UPDATE invoices_summary 
SET 
    amount = 20
WHERE
    payment_id = 2;

CREATE OR REPLACE VIEW invoices_left_to_pay AS
    SELECT 
        invoice_id,
        client_id,
        invoice_total,
        payment_total,
        invoice_total - payment_total AS amount_left_to_pay
    FROM
        invoices
    WHERE
        invoice_total - payment_total > 0;
        
SELECT 
    *
FROM
    invoices_left_to_pay;
    
UPDATE invoices_left_to_pay 
SET 
    invoice_total = 111.11
WHERE
    invoice_id = 2;

SELECT 
    *
FROM
    invoices
WHERE
    invoice_id = 2;

-- Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`sql_invoicing`.`payments`, CONSTRAINT `fk_payment_invoice` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`) ON UPDATE CASCADE)
DELETE FROM invoices_left_to_pay 
WHERE
    invoice_id = 2;

SELECT 
    *
FROM
    invoices
WHERE
    invoice_id = 2;

CREATE OR REPLACE VIEW payments_with_taxes AS
    SELECT 
        *, amount * 1.17 AS amount_with_taxes
    FROM
        payments;
        
SELECT 
    *
FROM
    payments_with_taxes;

DELETE FROM payments_with_taxes 
WHERE
    payment_id = 1;

SELECT 
    *
FROM
    payments
WHERE
    payment_id = 1;

-- Error Code: 1471. The target table payments_with_taxes of the INSERT is not insertable-into
-- Needs to be the exact rows as in the table to allow insering into view
insert into payments_with_taxes 
(payment_id, client_id, invoice_id, date, amount, payment_method) 
values
('1', '5', '2', '2019-02-12', '8.18', '1');

CREATE OR REPLACE VIEW payments_between_3_and_15 AS
    SELECT 
        *
    FROM
        payments
    WHERE
        payment_id BETWEEN 3 AND 15;
        
SELECT 
    *
FROM
    payments_between_3_and_15;
        
insert into payments_between_3_and_15 
(payment_id, client_id, invoice_id, date, amount, payment_method) 
values
('10', '5', '2', '2019-02-12', '8.18', '1');


SELECT 
    *
FROM
    payments_between_3_and_15;
       
SELECT 
    *
FROM
    payments;
    
-- WITH CHECK OPTION
-- The payment_id = 4 (16) will disappear from the view
    
UPDATE payments_between_3_and_15 
SET 
    payment_id = 16
WHERE
    payment_id = 4;


SELECT 
    *
FROM
    payments_between_3_and_15;
    
CREATE OR REPLACE VIEW payments_between_3_and_15 AS
    SELECT 
        *
    FROM
        payments
    WHERE
        payment_id BETWEEN 3 AND 15 WITH CHECK OPTION;
        
        
SELECT 
    *
FROM
    payments_between_3_and_15;
    
    
-- Error Code: 1369. CHECK OPTION failed 'sql_invoicing.payments_between_3_and_15'
UPDATE payments_between_3_and_15 
SET 
    payment_id = 17
WHERE
    payment_id = 3;
    
    
    


