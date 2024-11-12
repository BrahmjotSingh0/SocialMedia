import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Chat.css';
import urlconfig from '../../urlconfig';
import Overlay from '../Overlay/Overlay';

const Chat = ({ loggedInUser }) => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [overlayMessage, setOverlayMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/chats/${username}`, {
          params: { userUsername: loggedInUser.username }
        });
        setMessages(response.data);
      } catch (err) {
        setError('Error fetching messages');
      }
    };

    const fetchOtherUser = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/users/${username}`);
        setOtherUser(response.data);
      } catch (err) {
        setError('Error fetching user details');
      }
    };

    const fetchData = async () => {
      await fetchMessages();
      await fetchOtherUser();
      setLoading(false);
    };

    fetchData();
  }, [username, loggedInUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      setOverlayMessage('Please enter a message');
      return;
    }

   
    try {
      const response = await axios.post(`${urlconfig.API_URL}/chats`, {
        senderUsername: loggedInUser.username,
        receiverUsername: username,
        message: newMessage
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err) {
      setError('Error sending message');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-container">
      {otherUser && (
        <div className="chat-header">
          <Link to={`/user-profile/${otherUser.username}`} className="chat-header-link">
            <img src={otherUser.profilePicture} alt={`${otherUser.username}'s profile`} className="chat-header-image" />
            <h3 className="chat-header-username">{otherUser.username}</h3>
          </Link>
        </div>
      )}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === loggedInUser.username ? 'sent' : 'received'}`}>
            <div className="message-header">
              <img
                src={msg.sender === loggedInUser.username ? loggedInUser.profilePicture : otherUser?.profilePicture}
                alt={`${msg.sender === loggedInUser.username ? 'You' : otherUser?.username}'s profile`}
                className="message-profile-image"
              />
              <h4 className="message-username">{msg.sender === loggedInUser.username ? 'You' : otherUser?.username}</h4>
            </div>
            <p>{msg.message}</p>
            <span className="message-time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input-chat">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

Chat.propTypes = {
  loggedInUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
};

export default Chat;