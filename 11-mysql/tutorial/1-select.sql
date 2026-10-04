use sql_store;

select *
from customers;

select *
from customers
where customer_id = 1;

select 1, 2;

select customer_id, first_name, last_name, points, points + 10
from customers;

select customer_id, first_name, last_name, points, points + 10 as points_plus_10,  points - 10 as 'points minus 10'
from customers;

select state 
from customers;
-- 'FL', 'FL' ...

select distinct state 
from customers;
-- 'FL' ...


select * 
from customers 
where points > 2900 and city != 'Arlington';

select *
from customers 
where birth_date > '1985-02-07' || birth_date <= '1975-02-07';

select *
from customers 
where state = 'VA' or state = 'FL' or state = 'GA';

select *
from customers 
where state in ('VA', 'FL', 'GA');

select *
from customers 
where state not in ('VA', 'FL', 'GA');

select *
from customers
where points between 1000 and 3000;

select *
from customers
where first_name like '%a';

select *
from customers
where first_name like 'b%';

select *
from customers
where first_name like '%b%';
 

select *
from customers
where first_name like 'Am_u_';-- Ambur

select *
from customers
where first_name regexp 'b';
-- Will retrieve the all fields which include 'b', equivalent to %b%  
-- Babara, Ambur

select *
from customers
where first_name regexp '^b';  
-- Babara

select *
from customers
where first_name regexp 'a$';  
-- Babara
-- Elka
-- Romola

select *
from customers
where first_name regexp 'Ba|ka';  
-- Babara
-- Elka

select *
from customers
where first_name regexp 'Ba|ka';  
-- Babara
-- Elka

select *
from customers
where first_name regexp '[CI]le';  
-- Clemmie
-- Ilene

select *
from customers
where first_name regexp 'le[mn]';  
-- Clemmie
-- Ilene

select *
from customers
where first_name regexp '[d-q]a';  
-- Elka
-- Thacher
-- Romola

select *
from customers
where first_name  regexp 'a' and first_name not regexp '[d-q]a';  
-- Babara
-- Ambur

select *
from customers 
where phone is null;

select *
from customers
order by first_name;

select *
from customers
order by first_name desc;


select *
from customers
order by state, city;-- customer_id 4 before 8

select *
from customers
order by state, points;-- customer_id 8 before 4

select *
from customers 
limit 3; -- 1-3

select *
from customers 
limit 4, 4; -- skip offset 1-4, retrieve 5-8



















