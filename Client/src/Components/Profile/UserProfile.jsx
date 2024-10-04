// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './UserProfile.css';

const UserProfile = ({ loggedInUser }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${username}`);
        setUser(response.data);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container user-profile">
      <div className="profile-header">
        <img src={user.profilePicture} alt={`${user.username}'s profile`} className="profile-image" />
        <h2 className="username">{user.username}</h2>
        {loggedInUser && loggedInUser.username === username && (
          <button onClick={() => navigate('/user-settings')} className="btn btn-primary">
            Go to Settings
          </button>
        )}
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-count">{user.postsCount}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat">
          <span className="stat-count">{user.connectionsCount}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-count">{user.connectionsUsernames.length}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
      <div className="bio">
        <p>{user.bio}</p>
      </div>
      <div className="posts-grid">
        {user.posts.map((post, index) => (
          <img key={index} src={`https://picsum.photos/200/200?random=${index}`} alt={`Post ${index + 1}`} className="post-image" />
        ))}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  loggedInUser: PropTypes.object,
};

export default UserProfile;