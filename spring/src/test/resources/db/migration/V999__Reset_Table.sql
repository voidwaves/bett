DROP TABLE user_table CASCADE;
DROP TABLE report_entry_table CASCADE;

CREATE TABLE IF NOT EXISTS user_table (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    begin_of_apprenticeship DATE NOT NULL,
    label VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,

    CONSTRAINT UC_user UNIQUE (first_name, last_name),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS report_entry_table (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    content VARCHAR(255) NOT NULL,
    report_date DATE NOT NULL,
    working_hours NUMERIC NOT NULL,
    department VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,

    CONSTRAINT UC_report_entry UNIQUE (user_id, report_date),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user_table(id) ON DELETE CASCADE
);