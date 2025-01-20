import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import "./style.css";

const UserRegister = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/users/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      navigate('/userDashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;