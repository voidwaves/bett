INSERT INTO user_table (first_name, last_name, begin_of_apprenticeship, label, username, password) VALUES
    ('Jonas', 'Hellwig', '2018-07-31', 'Fachinformatiker Anwendungsentwicklung', 'javaforever', '$2a$10$1IzDO2J03W3IsuWVYGlqyebDcKzxumEy35wDfMx1Q/86wmnjE4hgm'),
    -- pw is '123456'
    ('Martin', 'Manka', '2018-07-31', 'Fachinformatiker Anwendungsentwicklung aber cooler', 'testuser', '$2a$10$6cToq2vveB.f1I6Rfr2e7uvjNpH2CQ1muBvMaViUBLjts8IAezSN2');
    -- pw is 'password'

INSERT INTO report_entry_table (content, report_date, working_hours, department, user_id) VALUES
    ('Ich war fleißig', '2020-08-20', 7.8, 'Berufsschule', 1),
    ('abait', '2020-08-21', 2.8, 'Berufsschule', 1),
    ('foobar', '2020-08-22', 9.0, 'Berufsschule', 2),
    ('Übrigens, ich bin veganer', '2020-08-23', 0.3, 'Berufsschule', 2);