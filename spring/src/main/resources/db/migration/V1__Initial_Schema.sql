CREATE TABLE IF NOT EXISTS user (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    begin_of_apprenticeship DATE NOT NULL,
    label VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS report_entry (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    content VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    working_hours NUMERIC NOT NULL,
    department VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);