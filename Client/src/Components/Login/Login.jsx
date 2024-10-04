import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [overlayMessage, setOverlayMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      if (response.data.user) {
        onLogin(response.data.user);
        setOverlayMessage(response.data.message);
        setTimeout(() => {
          navigate(`/user-profile/${response.data.user.username}`); // Redirect to UserProfile page after login
        }, 2000);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
    }
  };

  const closeOverlay = () => {
    setOverlayMessage('');
  };

  return (
    <div className="signin-container">
      <h2>Login</h2>
      {overlayMessage && <Overlay message={overlayMessage} onClose={closeOverlay} />}
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