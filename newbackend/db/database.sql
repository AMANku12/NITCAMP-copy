CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(55) NOT NULL,
    email VARCHAR(55) NOT NULL UNIQUE,
    role VARCHAR(10) CHECK (
        role IN ('mentee', 'mentor') NOT NULL
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentee (
    mentee_id SERIAL PRIMARY KEY,
    rollno VARCHAR(20) NOT NULL UNIQUE,
    college_email VARCHAR(55) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    department VARCHAR(55) NOT NULL,
    year INTEGER CHECK (year IN (1, 2, 3, 4) NOT NULL),
    interest_areas TEXT [] NOT NULL,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE mentor (
    mentor_id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    department VARCHAR(55) NOT NULL,
    year_graduated INTEGER NOT NULL,
    mentee_capacity INTEGER NOT NULL,
    mentoring_type VARCHAR(55),
    broad_expertise_areas TEXT [] NOT NULL,
    narrow_expertise_areas TEXT [] NOT NULL,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(55) NOT NULL UNIQUE,
    name VARCHAR(55) NOT NULL,
    password TEXT NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
);