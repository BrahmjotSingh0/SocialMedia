// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Components/Header/Navbar';
import FeedPage from './Components/Feed/FeedPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AddPost from './Components/AddPost/AddPost';
import UserListPage from './Components/user/UserListPage';
import UserProfile from './Components/Profile/UserProfile';
import UserSettings from './Components/Profile/UserSettings';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Store user in cookies for 7 days
    setLoginMessage('Login successful');
    setTimeout(() => setLoginMessage(''), 3000);
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <div className='main-content'>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/user-profile/:username" element={<UserProfile loggedInUser={user} />} />
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