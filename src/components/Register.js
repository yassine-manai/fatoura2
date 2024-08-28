// components/Register.js
import React, { useState } from 'react';
import '../styles/styles.css'; // Adjust the path according to your project structure

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/php-invoice/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: name,
          email: email,
          password: password,
          userType: userType,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        onRegister(data.user); // Assuming `onRegister` expects the new user data
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="page-title"><strong>Register</strong></div>
      <div className="col-lg-4 col-md-8 col-sm-12 col-12 my-3">
        <div className="card shadow w-100">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="userType">User Type:</label>
                <select
                  id="userType"
                  className="form-select"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="" disabled>-- Select User Type --</option>
                  <option value="Frs">Fournisseurs</option>
                  <option value="Agent">Agent</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3 w-100 d-flex justify-content-center">
                <button type="submit" className="btn btn-success rounded-pill">
                  <i className="fas fa-user-plus"></i> Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
