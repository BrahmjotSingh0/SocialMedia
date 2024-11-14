import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedComponent from './FeedComponent';
import ConnectionsComponent from './ConnectionsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import urlconfig from '../../urlconfig';
import './FeedPage.css';

const FeedPage = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container feed-page-container">
      <div className="feed-content">
        <div className="posts-section">
          <div className="feed-grid">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <FeedComponent
                  key={index}
                  username={post.username}
                  userImage={post.userImage}
                  postImage={post.image}
                  likes={post.likes}
                  comments={post.comments.length}
                  createdAt={post.createdAt}
                />
              ))
            ) : (
              <p className="no-posts-message">No posts available or Loading...</p>
            )}
          </div>
        </div>
        <div className="connections-section">
          <ConnectionsComponent loggedInUser={loggedInUser} />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;