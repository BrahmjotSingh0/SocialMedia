import { useState } from 'react';
import axios from 'axios';
import Overlay from '../Overlay/Overlay';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [overlayMessage, setOverlayMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setOverlayMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/register', { email, username, password });
      setOverlayMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Redirect to Login page after registration
      }, 2000);
    } catch (err) {
      console.error(err);
      setOverlayMessage('An error occurred during registration');
    }
  };

  const closeOverlay = () => {
    setOverlayMessage('');
  };

  return (
    <div className="signup-container">
      <h2>Register</h2>
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
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;