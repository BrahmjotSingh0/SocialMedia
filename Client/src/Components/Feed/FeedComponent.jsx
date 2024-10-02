import React from 'react';
import PropTypes from 'prop-types';
import './FeedComponent.css';

const FeedComponent = ({ username, userImage, postImage, likes, comments }) => {
  return (
    <div className="feed-component">
      <div className="feed-header">
        <img src={userImage} alt={`${username}'s profile`} className="user-image" />
        <span className="username">{username}</span>
      </div>
      <img src={postImage} alt="User post" className="post-image" />
      <div className="feed-actions">
        <span className="likes">{likes} likes</span>
        <span className="comments">{comments} comments</span>
      </div>
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
};

export default FeedComponent;