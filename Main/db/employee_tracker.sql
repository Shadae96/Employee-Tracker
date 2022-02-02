DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    d_name VARCHAR (35)
);

CREATE TABLE role (

id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(35) NOT NULL,
salary DECIMAL UNSIGNED NOT NULL,
department_id INT UNSIGNED NOT NULL,
INDEX dep_ind (department_id),
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);


CREATE TABLE employee (

id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(35) NOT NULL,
last_name VARCHAR(35) NOT NULL
role_id INT UNSIGNED NOT NULL,
INDEX role_id (role_id),
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
manager_id INT UNSIGNED,
INDEX man_id (manager_id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL,
);

