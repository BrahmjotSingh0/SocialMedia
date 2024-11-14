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
    <div className="main-content-add-post">
      <h1 className="page-name-add-post">Add Post</h1>
      {overlayMessage && <Overlay message={overlayMessage} onClose={closeOverlay} />}
      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group-add-post">
          <label className="label-add-post">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="input-add-post" />
        </div>
        <div className="form-group-add-post">
          <label className="label-add-post">Caption:</label>
          <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} required className="input-add-post" />
        </div>
        <div className="form-group-add-post">
          <label className="label-add-post">Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="input-add-post" />
        </div>
        <button type="submit" className="btn-add-post">
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