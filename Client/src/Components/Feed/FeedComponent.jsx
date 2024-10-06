// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './FeedComponent.css';

const FeedComponent = ({ username, userImage, postImage, likes, comments, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="feed-component">
      <div className="feed-header">
        <img src={userImage} alt={`${username}'s profile`} className="user-image" />
        <Link to={`/user-profile/${username}`} className="username">{username}</Link>
      </div>
      <img src={postImage} alt="User post" className="post-image-feed-page" />
      <div className="feed-actions">
        <span className="likes">{likes} likes</span>
        <span className="comments">{comments} comments</span>
      </div>
      <div className="post-date">Posted at: {formattedDate}</div>
      <div className="comment-box">
        <input type="text" placeholder="Add a comment..." className="comment-input" />
      </div>
    </div>
  );
};

FeedComponent.propTypes = {
  username: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  postImage: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default FeedComponent;