-- Drops the employee_db if it already exists --
DROP DATABASE IF EXISTS employee_db;

-- Create the database employee_db and specified it for use.
CREATE DATABASE employee_db;
use employee_db;

-- Populate department table
insert into department VALUES ( 1006, "Corporate" ), ( 1001, "HR" ),  ( 1002, "Finance" ), ( 1003, "Operations" ), 
( 1004, "Digital Marketing" ), ( 1005, "Sales" );

-- Populate role table
insert into role VALUES ( 10006, "Chairman", "1050000.00", 1006 ),
( 10001, "HRBP", "65000.00", 1001 ),
( 10002, "Accountant", "70000.00", 1002 ),
( 10003, "Analyst", "57500.00", 1004 ),
( 10004, "Operations Manager", "61000.00", 1003 ),
( 10005, "Sales Manager", "62000.00", 1005 );

-- Populate employee table
insert into employee VALUES ( 100001, "Joey", "Lane", 10006, NULL),
( 100002, "Hugo", "Walker", 10001, 100001),
( 100003, "Cesar", "Robinson", 10002, 100002),
( 100004, "Darrel", "Nguyen", 10005, 100002),
( 100005, "Kenny", "Vargas", 10004, 100002),
( 100006, "Cornelius", "Hampton", 10003, 100004);

ALTER USER 'testuser'@'localhost' IDENTIFIED WITH mysql_native_password BY "test@100";