import React, { useState, useEffect } from 'react';
import '../Styles/LoginRegister.css';
import image1 from '../assets/login-banner.png';

const USER_KEY = 'registeredUsers';  // localStorage key

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load users from localStorage at start
    const savedUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
    setUsers(savedUsers);
  }, []);

  const toggleForm = () => {
    setError('');
    setSuccess('');
    setFormData({ email: '', password: '', name: '' });
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, name } = formData;
    if (!email || !password || !name) {
      setError('Please fill all fields.');
      return;
    }
    if (users.find(u => u.email === email)) {
      setError('Email already registered. Please login.');
      return;
    }
    const newUser = { email, password, name };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setSuccess('Registration successful! Please login.');
    setIsLogin(true);
    setFormData({ email: '', password: '', name: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError('Please fill email and password.');
      return;
    }
    const matchedUser = users.find(u => u.email === email && u.password === password);
    if (!matchedUser) {
      setError('Invalid email or password.');
      return;
    }
    setError('');
    setSuccess(`Welcome back, ${matchedUser.name}!`);
    // TODO: आगे का login flow जैसे token सेट करना, redirect इत्यादि
  };

  return (
    <div className="login-register-container">
      <div className="image-section" style={{ backgroundImage: `url(${image1})` }} />
      <div className="form-section">
        <h2 className="form-title">{isLogin ? 'Login to Your Account' : 'Create a New Account'}</h2>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="form fade-in">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <button type="submit" className="submit-btn">Login</button>
            <p className="toggle-text">
              Don't have an account?{' '}
              <button type="button" className="toggle-btn" onClick={toggleForm}>
                Register here
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="form fade-in">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <button type="submit" className="submit-btn">Register</button>
            <p className="toggle-text">
              Already have an account?{' '}
              <button type="button" className="toggle-btn" onClick={toggleForm}>
                Login here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
