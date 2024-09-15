CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (email, password) VALUES ('example@example.com', 'hashed_password_example');

SELECT * FROM users WHERE email = 'example@example.com';

UPDATE users SET password = 'new_hashed_password_example' WHERE email = 'example@example.com';

DELETE FROM users WHERE email = 'example@example.com';
