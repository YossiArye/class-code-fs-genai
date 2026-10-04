select * 
from orders
inner join customers
on orders.customer_id = customers.customer_id;

-- 'inner' keyword is optional 
select * 
from orders
join customers
on orders.customer_id = customers.customer_id;

select order_id, customers.customer_id, first_name, last_name -- Must spesify which table customer_id refers to, otherwise will get an error, "Error Code: 1052. Column 'customer_id' in field list is ambiguous"
from orders
join customers
on orders.customer_id = customers.customer_id;

-- aliases 
select o.order_id, o.customer_id, first_name, last_name
from orders o
join customers c
on o.customer_id = c.customer_id;

-- multiple joining
select o.customer_id, first_name as customer_first_name, last_name as customer_last_name, o.order_id,  p.product_id, p.name as product_name
from customers c
join orders o
	on o.customer_id = c.customer_id
join order_items oi
	on o.order_id = oi.order_id
join products p 
    on oi.product_id = p.product_id;

-- join across db's
select o.customer_id, first_name as customer_first_name, last_name as customer_last_name, o.order_id,  p.product_id, p.name as product_name
from customers c
join orders o
	on o.customer_id = c.customer_id
join order_items oi
	on o.order_id = oi.order_id
join sql_inventory.products p 
	on oi.product_id = p.product_id;

-- We can use 'using' clause when the join columns are same
select o.customer_id, first_name as customer_first_name, last_name as customer_last_name, o.order_id,  p.product_id, p.name as product_name
from customers c
join orders o
	using(customer_id)
join order_items oi
	using(order_id)
join sql_inventory.products p 
	using(product_id);
    

-- multiple joining with one 'on'
select o.customer_id, first_name as customer_first_name, last_name as customer_last_name, o.order_id,  p.product_id, p.name as product_name
from customers c
join orders o
join order_items oi
join sql_inventory.products p 
	on o.customer_id = c.customer_id and o.order_id = oi.order_id and oi.product_id = p.product_id;
    
-- self joining
-- The following query will not retrieves the data properly (incorrect 'on' clauser)
select emp1.first_name, emp1.last_name, emp1.job_title, emp2.first_name as manager_first_name, emp2.last_name as last_name
from sql_hr.employees emp1
join sql_hr.employees emp2
	on emp1.employee_id = emp2.reports_to;
-- The following query will retrieves the data properly
select emp1.first_name, emp1.last_name, emp1.job_title, emp2.first_name as manager_first_name, emp2.last_name as last_name
from sql_hr.employees emp1
join sql_hr.employees emp2
	on emp2.employee_id = emp1.reports_to;
    
-- implicit join - not recommended because in case of where will be forgotten it will be a cross join
select o.order_id, o.customer_id, first_name, last_name
from orders o, customers c
where o.customer_id = c.customer_id;

-- explicit cross join
select o.order_id, o.customer_id, first_name, last_name
from orders o
cross join customers c;

