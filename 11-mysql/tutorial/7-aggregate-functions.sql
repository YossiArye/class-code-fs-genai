use sql_invoicing;

select * from invoices;

select 
	max(invoice_total) as max,
	min(invoice_total) as min,
	avg(invoice_total) as avg,
	sum(invoice_total) as sum,
	count(invoice_total) as count_of_invoices,-- not including nulls
    count(payment_date) as count_of_payment_dates,-- not including nulls
    count(*) as count_of_records-- including nulls
from invoices;

-- aggregate with criteria
select 
	max(invoice_total) as max,
	min(invoice_total) as min,
	avg(invoice_total) as avg,
	sum(invoice_total) as sum,
	count(invoice_total) as count_of_invoices,-- not including nulls
    count(payment_date) as count_of_payment_dates,-- not including nulls
    count(*) as count_of_records-- including nulls
from invoices
where invoice_id <> 18;

-- distinct
select 
	count(distinct client_id) as count_of_clients
from invoices
