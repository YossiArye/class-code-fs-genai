select first_name, last_name 
from sql_hr.employees
union 
select first_name, last_name 
from customers;

select customer_id, first_name, last_name, 'VIP' as status
from customers
where points > 1000
union
select customer_id, first_name, last_name, 'REGULAR' as status
from customers
where not points > 1000;