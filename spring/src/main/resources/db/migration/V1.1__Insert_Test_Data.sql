INSERT INTO user (first_name, last_name, begin_of_apprenticeship, label, username, password) VALUES
    ('Jonas', 'Hellwig', '2018-07-31', 'Fachinformatiker Anwendungsentwicklung', 'javaforever', '123456'),
    ('Martin', 'Manka', '2018-07-31', 'Fachinformatiker Anwendungsentwicklung aber cooler', 'xXProgamer95Xx', 'password');

INSERT INTO report_entry (content, date, working_hours, department, user_id) VALUES
    ('Ich war fleißig', '2020-08-20', 7.8, 'Berufsschule', 1),
    ('abait', '2020-08-21', 2.8, 'Berufsschule', 1),
    ('foobar', '2020-08-22', 9.0, 'Berufsschule', 2),
    ('Übrigens, ich bin veganer', '2020-08-22', 0.3, 'Berufsschule', 2);