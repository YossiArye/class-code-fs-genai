use sql_store;

insert into customers
values
(default,
'Yossi',
'Arye',
default,
default,
'address',
'Haifa',
'IL',
default);

select * from customers;

INSERT INTO `sql_store`.`customers`
(
`first_name`,
`last_name`,
`address`,
`city`,
`state`)
VALUES
(
'Israel',
'Israeli',
'address',
'Haifa',
'IL');

select * from customers;


INSERT INTO `sql_store`.`customers`
(
`first_name`,
`last_name`,
`address`,
`city`,
`state`,
`phone`,
`birth_date`,
`points`)
VALUES
(
'David',
'Davidi',
'address',
'Haifa',
'IL',
'0555555556',
'1991-03-04',
10),(
'Yuval',
'Arbel',
'address',
'Haifa',
'IL',
'0555555556',
'1991-03-04',
10),(
'Yoram',
'Buzaglo',
'address',
'Haifa',
'IL',
'0555555556',
'1991-03-04',
10);

select * from customers;

-- insert into hierarchic tables
insert into orders
(customer_id, order_date, status, comments, shipped_date, shipper_id)
values(last_insert_id(), '2022-12-12', 1, default, '2022-12-12', 1);

select * from customers;
select * from orders;


-- insert into select
select * from sql_hr.employees;

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
select 
    FLOOR(RAND() * (30000)),
    first_name,
    last_name,
    'Broker',
    10000,
    1,
    37270
from
    customers
where
    points > 3000;

select * from sql_hr.employees;





