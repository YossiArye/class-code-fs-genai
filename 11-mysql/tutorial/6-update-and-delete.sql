
use sql_invoicing;

select * from invoices;

-- Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.
update invoices
set payment_total = 10, payment_date = '2022-09-27';

update invoices
set payment_total = 10, payment_date = '2022-09-27'
where invoice_id = 1;

select * from invoices;


update invoices
set payment_total = invoice_total * 0.5, payment_date = due_date
where invoice_id between 1 and 2;

select * from invoices;









