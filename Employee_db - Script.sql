use employee_db;

insert into department VALUES ( 1006, "Corporate" ), ( 1001, "HR" ),  ( 1002, "Finance" ), ( 1003, "Operations" ), 
( 1004, "Digital Marketing" ), ( 1005, "Sales" );

select * from department;

insert into role VALUES ( 10006, "Chairman", "1050000.00", 1006 ),
( 10001, "HRBP", "65000.00", 1001 ),
( 10002, "Accountant", "70000.00", 1002 ),
( 10003, "Analyst", "57500.00", 1004 ),
( 10004, "Operations Manager", "61000.00", 1003 ),
( 10005, "Sales Manager", "62000.00", 1005 );

select * from role;

insert into employee VALUES ( 100001, "Joey", "Lane", 10006, NULL),
( 100002, "Hugo", "Walker", 10001, 100001),
( 100003, "Cesar", "Robinson", 10002, 100002),
( 100004, "Darrel", "Nguyen", 10005, 100002),
( 100005, "Kenny", "Vargas", 10004, 100002),
( 100006, "Cornelius", "Hampton", 10003, 100004);

Select * from employee_db.employee;
Select e.id, e.first_name, e.last_name, e.role_id, e.manager_id, d.dept_name
from employee as e
	INNER JOIN role as r ON r.id = e.role_id
    INNER JOIN department as d ON d.id = r.role_department
    WHERE r.role_department = 1004;

-- query by manager using JOIN
SELECT distinct e2.id, e2.first_name, e2.last_name, e2.role_id, e2.manager_id
 from employee as e1
	INNER JOIN employee as e2 ON e2.id = e1.manager_id;
    
-- query by manager using IN clause
SELECT id, first_name, last_name, role_id, manager_id
 from employee as e1
 WHERE id IN ( SELECT DISTINCT manager_id FROM employee );
    

ALTER USER 'testuser'@'localhost' IDENTIFIED WITH mysql_native_password BY "test@100";