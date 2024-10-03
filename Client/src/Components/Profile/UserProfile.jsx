// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.css';

const user = {
  username: 'user1',
  profile: 'https://randomuser.me/api/portraits/men/70.jpg',
  followers: 100,
  following: 50,
  posts: 10,
  bio: 'This is a sample bio for user1.',
  postImages: [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=4',
    'https://picsum.photos/200/200?random=5',
    'https://picsum.photos/200/200?random=6'
  ]
};

const UserProfile = () => {
  return (
    <div className="container user-profile">
      <div className="profile-header">
        <img src={user.profile} alt={`${user.username}'s profile`} className="profile-image" />
        <h2 className="username">{user.username}</h2>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-count">{user.posts}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat">
          <span className="stat-count">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-count">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
      <div className="bio">
        <p>{user.bio}</p>
      </div>
      <div className="posts-grid">
        {user.postImages.map((image, index) => (
          <img key={index} src={image} alt={`Post ${index + 1}`} className="post-image" />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;