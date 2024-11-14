import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Overlay from '../Overlay/Overlay';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import urlconfig from '../../urlconfig';
import logo from '../../../assets/logo.png';
import googleLogo from '../../../assets/google-logo.svg'; // Add Google logo

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [overlayMessage, setOverlayMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setOverlayMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${urlconfig.API_URL}/register`, { email, username, password });
      setOverlayMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Redirect to Login page after registration
      }, 2000);
    } catch (err) {
      console.error(err);
      setOverlayMessage('An error occurred during registration');
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
  };

  const closeOverlay = () => {
    setOverlayMessage('');
  };

  return (
    <div className="signup-container">
      {overlayMessage && <Overlay message={overlayMessage} onClose={closeOverlay} />}
      <form onSubmit={handleSubmit}>
        <div className="signup-header">
          <img src={logo} alt="logo" className="logo" />
          <div className="title-container">
            <h1 className="title">PostItUp</h1>
            <p className="welcome-message">Join PostItUp Today! 👋</p>
            <p className="about-message">PostItUp is a social media platform where you can share your posts and connect with others.</p>
          </div>
        </div>
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
        {overlayMessage && <p className="error-message">{overlayMessage}</p>}
        <button type="submit" className="btn">Register</button>
        <p className="login-message">Already have an account? <a href="/login">Login</a></p>
      </form>
      <div className="google-login" onClick={handleGoogleLogin}>
        <img src={googleLogo} alt="Google login" className="google-logo" />
        <p>Register with Google</p>
      </div>
    </div>
  );
};

export default Register;