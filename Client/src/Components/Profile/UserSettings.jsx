/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Fetch the latest user data
      const response = await axios.get(`${urlconfig.API_URL}/users/${user.username}`);
      const latestUser = response.data;

      
      const updatedUser = {
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
      <h2>User Settings</h2>
      {error && <p className="error">{error}</p>}
      {overlayMessage && <Overlay message={overlayMessage} onClose={closeOverlay} />}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
        </div>
        <button type="submit">Update</button>
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