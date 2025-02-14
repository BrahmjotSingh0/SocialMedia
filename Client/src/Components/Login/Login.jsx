import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';
import './Login.css';
import urlconfig from '../../urlconfig';
import logo from '../../../assets/logo.png';
import googleLogo from '../../../assets/google-logo.svg';
import Cookies from 'js-cookie';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    try {
      const response = await axios.post(`${urlconfig.API_URL}/login`, { email, password });
      if (response.data.user) {
        onLogin(response.data.user);
        setOverlayMessage(response.data.message);
        setTimeout(() => {
          navigate(`/user-profile/${response.data.user.username}`); 
        }, 2000);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login');
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
    <div className="signin-container">
      {overlayMessage && <Overlay message={overlayMessage} onClose={closeOverlay} />}
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="login-header">
          <img src={logo} alt="logo" className="logo" />
          <div className="title-container">
            <h1 className="title">PostItUp</h1>
            <p className="welcome-message">Welcome to PostItUp App! 👋</p>
            <p className="about-message">PostItUp is a social media platform where you can share your posts and connect with others.</p>
            <p className="welcome-back-message">Welcome back user! Please login to continue.</p>
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
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn">Login</button>
        <p className="register-message">Don&apos;t have an account? <a href="/register">Register</a></p>
      </form>
      <div className="google-login" onClick={handleGoogleLogin}>
        <img src={googleLogo} alt="Google login" className="google-logo" />
        <p>Login with Google</p>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;