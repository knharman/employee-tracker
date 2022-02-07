INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

INSERT INTO job (title, salary, department_id)
VALUES
  ('Salesperson', 80000, 2),
  ('Lead Engineer', 150000, 1),
  ('Software Engineer', 120000, 1),
  ('Account Manager', 160000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4),
  ('Sales Team Lead', 100000, 2);
  

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES
  ('Malia', 'Brown', 2, NULL),
  ('Sarah', 'Lourd', 4, NULL),
  ('Mike', 'Chan', 8, NULL),
  ('Ashley', 'Rodriguez', 6, NULL),
  ('Kellie', 'Harman', 3, 1),
  ('Kevin', 'Tupik', 3, 1),
  ('Sam', 'Kash', 5, 2),
  ('Kunal', 'Singh', 5, 2), 
  ('Tom', 'Allen', 1, 3),
  ('John', 'Day', 1, 3);

  