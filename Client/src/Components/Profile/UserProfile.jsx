import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './UserProfile.css';
import urlconfig from '../../urlconfig';
import Overlay from '../Overlay/Overlay';

const UserProfile = ({ loggedInUser }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showOverlay, setShowOverlay] = useState(false); 
  const [selectedPost, setSelectedPost] = useState(null); 
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

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedPost(null);
  };

  const handleConnect = async () => {
    try {
      await axios.post(`${urlconfig.API_URL}/connect`, {
        userId: loggedInUser._id,
        connectUsername: username
      });
      setUser(prevUser => ({
        ...prevUser,
        connections: [...prevUser.connections, { username: loggedInUser.username }]
      }));
    } catch (err) {
      console.error('Error connecting:', err);
    }
  };

  const isConnected = loggedInUser && user && user.connections.some(conn => conn.username === loggedInUser.username);

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
        <Link to={`/connections/${user.username}`} className="stat no-underline">
          <span className="stat-count">{user.connections.length}</span>
          <span className="stat-label">Connections</span>
        </Link>
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
      {loggedInUser && loggedInUser.username !== username && (
        <>
          {isConnected ? (
            <button className="btn btn-secondary" disabled>
              Connection Added
            </button>
          ) : (
            <button onClick={handleConnect} className="btn btn-primary">Connect</button>
          )}
          <button onClick={() => navigate(`/chat/${username}`)} className="btn btn-primary">Chat</button>
        </>
      )}
      <div className="posts-grid">
        {user.posts.length > 0 ? (
          user.posts.map((post, index) => (
            <div key={index} className="post-item" onClick={() => handlePostClick(post)}>
              <div className="post-image-container">
                <img src={post.image} alt={`Post ${index + 1}`} className="post-image" />
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-caption">{post.caption}</p>
                <p className="post-date">Posted at: {new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
              </div>
              {loggedInUser && loggedInUser.username !== username && (
                <div className="comment-box">
                  <input type="text" placeholder="Add a comment..." className="comment-input" />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      {showOverlay && selectedPost && (
        <Overlay message={<img src={selectedPost.image} alt="Selected Post" />} onClose={handleCloseOverlay} />
      )}
    </div>
  );
};

UserProfile.propTypes = {
  loggedInUser: PropTypes.object,
};

export default UserProfile;