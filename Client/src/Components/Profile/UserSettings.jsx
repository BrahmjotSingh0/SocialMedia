import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Overlay from '../Overlay/Overlay';
import './UserSettings.css';
import urlconfig from '../../urlconfig';

const UserSettings = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || '');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');
  const [connectionsCount, setConnectionsCount] = useState(user.connectionsCount || 0);
  const [connectionsUsernames, setConnectionsUsernames] = useState(user.connectionsUsernames || []);
  const [postsCount, setPostsCount] = useState(user.postsCount || 0);
  const [posts, setPosts] = useState(user.posts || []);
  const [error, setError] = useState('');
  const [overlayMessage, setOverlayMessage] = useState('');

  useEffect(() => {
    const fetchLatestUserData = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/users/${user.username}`);
        const latestUser = response.data;
        setEmail(latestUser.email);
        setUsername(latestUser.username);
        setBio(latestUser.bio || '');
        setProfilePicture(latestUser.profilePicture || '');
        setConnectionsCount(latestUser.connectionsCount || 0);
        setConnectionsUsernames(latestUser.connectionsUsernames || []);
        setPostsCount(latestUser.postsCount || 0);
        setPosts(latestUser.posts || []);
      } catch (err) {
        console.error('Error fetching latest user data:', err);
      }
    };

    fetchLatestUserData();
  }, [user.username]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${urlconfig.API_URL}/users/${user.username}`);
      const latestUser = response.data;

      const updatedUser = {
        ...latestUser,
        email,
        username,
        bio,
        profilePicture,
        connectionsCount,
        connectionsUsernames,
        postsCount: latestUser.postsCount,
        posts: latestUser.posts
      };

      const updateResponse = await axios.put(`${urlconfig.API_URL}/users/${user._id}`, updatedUser);
      setOverlayMessage('User updated successfully');
      console.log('User updated:', updateResponse.data);

      setEmail(updateResponse.data.email);
      setUsername(updateResponse.data.username);
      setBio(updateResponse.data.bio || '');
      setProfilePicture(updateResponse.data.profilePicture || '');
      setConnectionsCount(updateResponse.data.connectionsCount || 0);
      setConnectionsUsernames(updateResponse.data.connectionsUsernames || []);
      setPostsCount(updateResponse.data.postsCount || 0);
      setPosts(updateResponse.data.posts || []);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Email or username already exists');
        setOverlayMessage('Email or username already exists');
      } else {
        setError('Error updating user');
        setOverlayMessage('Error updating user');
      }
      console.error('Error updating user:', err);
    }
  };

  const closeOverlay = () => {
    setOverlayMessage('');
  };

  return (
    <div className="user-settings">
      <h2 className="user-settings-title">User Settings</h2>
      {error && <p className="error">{error}</p>}
      {overlayMessage && <Overlay message={overlayMessage} onClose={closeOverlay} />}
      <form onSubmit={handleUpdate} className="user-settings-form">
        <div className="form-group">
          <label className="user-settings-label">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="user-settings-input" />
        </div>
        <div className="form-group">
          <label className="user-settings-label">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="user-settings-input" />
        </div>
        <div className="form-group">
          <label className="user-settings-label">Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="user-settings-textarea" />
        </div>
        <div className="form-group">
          <label className="user-settings-label">Profile Picture</label>
          <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} className="user-settings-input" />
        </div>
        <button type="submit" className="user-settings-button">Update</button>
      </form>
    </div>
  );
};

UserSettings.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profilePicture: PropTypes.string,
    connectionsCount: PropTypes.number,
    connectionsUsernames: PropTypes.arrayOf(PropTypes.string),
    postsCount: PropTypes.number,
    posts: PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string,
      likes: PropTypes.number,
      comments: PropTypes.arrayOf(PropTypes.shape({
        user: PropTypes.string,
        comment: PropTypes.string
      }))
    })),
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default UserSettings;