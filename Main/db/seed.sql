USE employee_tracker;

INSERT INTO department
    (name)
VALUES
('sales'),
('Engineering'),
('Finance'),
('Legal'),
('Customer Support');

INSERT INTO role
    (title, salary, department_id)
VALUES
('Sales Manager', 120000, 1),
('Sales Rep', 75000, 1),
('Sales Rep', 80000, 1),
('Software Engineer', 130000, 2),
('Lead Software Engineer', 150000, 2),
('Software Engineer Manager', 180000, 2),
('Accountant', 90000, 3),
('Senior Accountant', 110000, 3),
('Inside Counsel', 130000, 4),
('Customer Support Rep', 50000, 5);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
('Sarah', 'Parker', 1, NULL),
('Justin', 'Robinson', 2, 2),
('Kenya', 'Shoemaker', 3, NULL),
('Rihanna', 'Fenty', 4, 3),
('Nola', 'Porland', 5, NULL),
('Jimmy', 'Brown', 6, 5),
('Alex', 'Reeves', 7, NULL),
('Trey', 'Newsome', 8, 7);