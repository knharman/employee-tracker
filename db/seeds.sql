INSERT INTO department (name)
VALUES
  ('Grocery'),
  ('Customer Service'),
  ('Produce');

INSERT INTO job (title, salary, department_id)
VALUES
  ('Team Leader', 60000, 1),
  ('Team Leader', 60000, 2),
  ('Team Leader', 60000, 3),
  ('Team Member', 30000, 1),
  ('Team Member', 30000, 2),
  ('Team Member', 30000, 3),
  ('Associate Team Leader', 50000, 1),
  ('Associate Team Leader', 50000, 2),
  ('Associate Team Leader', 50000, 3);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Kellie', 'Harman', 2, NULL),
  ('Cody', 'Potter', 3, NULL),
  ('Sarah', 'Wilcox', 7, 1),
  ('Katie', 'Dox', 9, 2),
  ('Joel', 'Zamora', 9, 3),
  ('Josh', 'Heleva', 4, 1),
  ('Chloe', 'Stewart', 5, 2),
  ('Julie', 'Woods', 6, 3);

  