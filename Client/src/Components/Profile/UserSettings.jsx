// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './UserSettings.css';

const UserSettings = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || '');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(`http://localhost:3001/users/${user._id}`, {
        email,
        username,
        bio,
        profilePicture
      });
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
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
          <label>Profile Picture URL</label>
          <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
        </div>
        <button type="submit">Update Profile</button>
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
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default UserSettings;