CREATE DATABASE employee_sample;

\c employee_sample;

CREATE TABLE "employee" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);