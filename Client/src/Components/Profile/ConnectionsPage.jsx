import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ConnectionsPage.css';
import urlconfig from '../../urlconfig';

const ConnectionsPage = ({ loggedInUser }) => {
  const { username } = useParams();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/users/${username}`);
        const connectionsWithProfilePictures = await Promise.all(
          response.data.connections.map(async (connection) => {
            const userResponse = await axios.get(`${urlconfig.API_URL}/users/${connection.username}`);
            return {
              ...connection,
              profilePicture: userResponse.data.profilePicture,
            };
          })
        );
        setConnections(connectionsWithProfilePictures);
        setLoading(false);
      } catch (err) {
        setError('Error fetching connections');
        setLoading(false);
      }
    };

    fetchConnections();
  }, [username]);

  const handleRemoveConnection = async (connectUsername) => {
    try {
      await axios.post(`${urlconfig.API_URL}/remove-connection`, {
        userId: loggedInUser._id,
        connectUsername: connectUsername
      });
      setConnections(prevConnections => prevConnections.filter(connection => connection.username !== connectUsername));
    } catch (err) {
      console.error('Error removing connection:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-for-connections-page">
      <div className="connections-page-wrapper">
        <h1>{username}'s Connections</h1>
        <div className="connections-list-wrapper">
          {connections.map((connection, index) => (
            <div key={index} className="connection-item-wrapper">
              <img src={connection.profilePicture || 'default-profile-pic-url'} alt={`${connection.username}'s profile`} className="profile-img-connection" />
              <div className="connection-info-wrapper">
                <Link to={`/user-profile/${connection.username}`} className="username-link-connection">
                  {connection.username}
                </Link>
                <p className="date-connected-wrapper">Connected on: {new Date(connection.dateConnected).toLocaleDateString()}</p>
                {loggedInUser && loggedInUser.username === username && (
                  <button onClick={() => handleRemoveConnection(connection.username)} className="btn btn-danger">
                    Remove Connection
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ConnectionsPage.propTypes = {
  loggedInUser: PropTypes.object,
};

export default ConnectionsPage;