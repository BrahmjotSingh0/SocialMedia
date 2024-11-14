import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ChatList.css';
import urlconfig from '../../urlconfig';

const ChatList = ({ loggedInUser }) => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/chats`, {
          params: { username: loggedInUser.username }
        });
        const chatData = await Promise.all(response.data.map(async (chat) => {
          const userResponse = await axios.get(`${urlconfig.API_URL}/users/${chat.otherUser}`);
          return {
            ...chat,
            otherUser: userResponse.data
          };
        }));
        setChats(chatData);
      } catch (err) {
        setError('Error fetching chats');
      }
    };

    fetchChats();
  }, [loggedInUser]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="chat-list">
      {chats.map((chat, index) => (
        chat.otherUser ? (
          <Link to={`/chat/${chat.otherUser.username}`} key={index} className="chat-item">
            <img src={chat.otherUser.profilePicture} alt={`${chat.otherUser.username}'s profile`} className="chat-profile-image" />
            <div className="chat-info">
              <h3 className="chat-username">{chat.otherUser.username}</h3>
              <p className="chat-tap">Tap to chat</p>
            </div>
          </Link>
        ) : null
      ))}
    </div>
  );
};

ChatList.propTypes = {
  loggedInUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatList;