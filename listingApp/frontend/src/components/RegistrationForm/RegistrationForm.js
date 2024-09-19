import React, { useState } from 'react';
import './RegistrationForm.css'
const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters long');
      return;
    }
    const userData = {
      email,
      password,
    };
    fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
      })
      .catch((error) => {
        setMessage('Error occurred during registration');
      });
  };

  return (
    <div className="registration-form">
      <h2 className="registration-form-title">User Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form-form">
        <div className="registration-form-group">
          <label className="registration-form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="registration-form-input"
          />
        </div>
        <div className="registration-form-group">
          <label className="registration-form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="registration-form-input"
          />
        </div>
        <button type="submit" className="registration-form-submit">
          Register
        </button>
      </form>
      {message && (
        <p
          className={
            message === 'Registration successful'
              ? 'registration-form-success'
              : 'registration-form-error'
          }
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;