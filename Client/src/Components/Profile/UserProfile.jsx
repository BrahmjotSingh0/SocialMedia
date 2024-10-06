/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './UserProfile.css';
import urlconfig from '../../urlconfig';

const UserProfile = ({ loggedInUser }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/users/${username}`);
        setUser(response.data);
        setLoading(false);
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
      {loggedInUser && loggedInUser.username === username && (
        <div className="profile-actions">
          <button onClick={() => navigate('/add-post')} className="btn btn-primary">
            Add Post
          </button>
          <button onClick={() => navigate('/user-settings')} className="btn btn-secondary">
            Settings
          </button>
        </div>
      )}
      <div className="posts-grid">
        {user.posts.length > 0 ? (
          user.posts.map((post, index) => (
            <div key={index} className="post-item">
              <img src={post.image} alt={`Post ${index + 1}`} className="post-image" />
              <p className="post-caption">{post.caption}</p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  loggedInUser: PropTypes.object,
};

export default UserProfile;