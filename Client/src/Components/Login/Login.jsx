import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Login.css'; 

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      if (response.data._id) {
        onLogin(response.data);
        console.log('Login successful:', response.data);
        navigate('/user-settings'); // Redirect to UserSettings page after login
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="signin-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;