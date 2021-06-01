CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT(10) NOT NULL, 
    name VARCHAR(30) NOT NULL, -- department name
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT(10) NOT NULL,
    title VARCHAR(30) NOT NULL, -- role title 
    salary DECIMAL(10,2) NOT NULL, 
    department_id INT(10), -- holds reference to department role belongs to
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT(10) NOT NULL, 
    manager_id INT(10) NULL, -- null if employee has no manager
    PRIMARY KEY (id)
);

-- Prepopulating database:
-- (1) Engineering: (177)software engineer, (155)QA engineer 
-- (2) Sales: (288)marketing lead, (210)salesperson
-- (3) Finance: (321)accountant
-- (4) Legal: (401)lawyer, (422)legal assistant

INSERT INTO department (id, name)
VALUES (1, "Engineering"), (2, "Sales"), (3, "Finance"), (4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (177, "Software Engineer", 150000, 1), (155, "QA Engineer", 120000, 1), (288, "Marketing Lead", 90000, 2), (210, "Salesperson", 70000, 2), (321, "Accountant",90000, 3), (401,"Lawyer", 150000, 4), (422, "Legal Assistant", 50000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (98, "Michelle", "Nguyen", 155, 23);

INSERT INTO employee (id, first_name, last_name, role_id) VALUES (23, "Jeffrey", "Lee", 177);