-- we will not retrieved customer_id 1, 3, 4, 9
select c.customer_id, o.order_id, first_name, last_name
from customers c
join orders o
on o.customer_id = c.customer_id; 

select c.customer_id, o.order_id, first_name, last_name
from customers c
left outer join orders o
on o.customer_id = c.customer_id; 

-- 'outer' keyword is optional 
select c.customer_id, o.order_id, first_name, last_name
from customers c
left join orders o
on o.customer_id = c.customer_id; 

select c.customer_id, o.order_id, first_name, last_name
from orders o
right join customers c 
on o.customer_id = c.customer_id; 

-- multiple outer joining
select c.customer_id, o.order_id, first_name, last_name, s.name as shipper_name
from customers c
left join orders o
on o.customer_id = c.customer_id
left join shippers s
on o.shipper_id = s.shipper_id;

-- For retrieving the manager itself
select emp1.first_name, emp1.last_name, emp1.job_title, emp2.first_name as manager_first_name, emp2.last_name as last_name
from sql_hr.employees emp1
left join sql_hr.employees emp2
	on emp2.employee_id = emp1.reports_to;