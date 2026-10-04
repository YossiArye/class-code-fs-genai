SELECT 
    *
FROM
    invoices;

SELECT 
    client_id, SUM(payment_total) AS sum_payment
FROM
    invoices
GROUP BY client_id;

SELECT 
    client_id, SUM(payment_total) AS sum_payment
FROM
    invoices
WHERE
    payment_date >= '2019-07-01'
GROUP BY client_id;

-- grouping multiple columns
SELECT 
    state, city, SUM(payment_total) AS sum_payment
FROM
    invoices
        JOIN
    clients USING (client_id)
GROUP BY state , city;

-- criteria on the grouped result - 'having'
SELECT 
    state, city, SUM(payment_total) AS sum_payment, count(*) as records_count
FROM
    invoices
        JOIN
    clients USING (client_id)
GROUP BY state , city
HAVING sum_payment > 100 and records_count > 5;-- The columns in 'having' must be a part of the columns in the select clause

-- rollup --

-- Add client wth {state: 'CA'} and {city: 'New city'}
insert into clients  (client_id, name, address, city, state, phone) values(6, 'Myworks', '34267 Glendale Parkway', 'New city', 'CA', '304-659-1170');

update invoices set client_id = 6 where invoice_id = 17;

-- rollup summarize every gruop and all groups 
SELECT 
    state, city, SUM(payment_total) AS sum_payment, count(*) as records_count
FROM
    invoices
        JOIN
    clients USING (client_id)
GROUP BY state , city with rollup;

