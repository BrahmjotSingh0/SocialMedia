// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Overlay from '../Overlay/Overlay';
import urlconfig from '../../urlconfig';
import './AddPost.css';

function AddPost({ user }) {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [overlayMessage, setOverlayMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${urlconfig.API_URL}/posts`, {
        title,
        caption,
        imageUrl,
        userId: user._id,
      });
      setOverlayMessage('Post added successfully');
    } catch (err) {
      console.error(err);
      setOverlayMessage('Error adding post');
    }
  };

  const closeOverlay = () => {
    setOverlayMessage('');
  };

  return (
    <div className="main-content">
      <h1 className="page-name">Add Post</h1>
      {overlayMessage && <Overlay message={overlayMessage} onClose={closeOverlay} />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Caption:</label>
          <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <button type="submit" className="btn">
          Add Post
        </button>
      </form>
    </div>
  );
}

AddPost.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddPost;