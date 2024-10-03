import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserListPage from './Components/user/UserListPage';
import Navbar from './Components/Header/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AddPost from './Components/AddPost/AddPost';
import FeedPage from './Components/Feed/FeedPage';
import UserProfile from './Components/Profile/UserProfile';
import UserSettings from './Components/Profile/UserSettings';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      setLoginMessage('You must be logged in to access this page.');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLoginMessage('');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setLoginMessage('You have been logged out.');
  };

  return (
    <div className='main-content'>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-settings" element={user ? <UserSettings user={user} /> : <Navigate to="/login" />} />
      </Routes>
      {loginMessage && <div className="alert alert-warning">{loginMessage}</div>}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;