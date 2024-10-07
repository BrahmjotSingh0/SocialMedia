// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedComponent from './FeedComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import urlconfig from '../../urlconfig';
import './FeedPage.css';

const FeedPage = () => {
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
    <div className="container">
      <h1 className="page-name">Feed Page</h1>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="col-md-6" key={index}>
              <FeedComponent
                username={post.username}
                userImage={post.userImage}
                postImage={post.image}
                likes={post.likes}
                comments={post.comments.length}
                createdAt={post.createdAt}
              />
            </div>
          ))
        ) : (
          <p>No posts available or Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FeedPage;