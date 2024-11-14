import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ConnectionsComponent.css';
import urlconfig from '../../urlconfig';

const ConnectionsComponent = ({ loggedInUser }) => {
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/users`);
        const users = response.data;
        const shuffledUsers = users.sort(() => 0.5 - Math.random());
        setRandomUsers(shuffledUsers.slice(0, 5));
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchRandomUsers();
  }, []);

  return (
    <div className="connections-component">
      <h2 className="connections-heading">Connect With others</h2>
      <div className="connections-list">
        {randomUsers.map((user, index) => (
          <div key={index} className="connection-box">
            <img src={user.profilePicture} alt={`${user.username}'s profile`} className="connection-profile-img" />
            <div className="connection-info">
              <Link to={`/user-profile/${user.username}`} className="connection-username">{user.username}</Link>
              <p className="connection-details">Posts: {user.postsCount}</p>
              <p className="connection-details">Connections: {user.connections.length}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/users" className="see-more-button">See More</Link>
    </div>
  );
};

ConnectionsComponent.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
};

export default ConnectionsComponent;