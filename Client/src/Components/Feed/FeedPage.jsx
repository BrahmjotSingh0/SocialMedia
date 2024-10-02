import React from 'react';
import FeedComponent from './FeedComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const users = [
  {
    username: 'user1',
    profile: 'https://randomuser.me/api/portraits/men/70.jpg',
  },
  {
    username: 'user2',
    profile: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    username: 'user3',
    profile: 'https://randomuser.me/api/portraits/men/82.jpg',
  }
];

const posts = [
  'https://picsum.photos/600/400?random=1',
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/400?random=3',
  'https://picsum.photos/600/400?random=4',
  'https://picsum.photos/600/400?random=5',
  'https://picsum.photos/600/400?random=6'
];

const FeedPage = () => {
  return (
    <div className="container">
      <h1 className='page-name'>Feed Page</h1>
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-6" key={index}>
            <FeedComponent
              username={user.username}
              userImage={user.profile}
              postImage={posts[index % posts.length]}
              likes={Math.floor(Math.random() * 1000)}
              comments={Math.floor(Math.random() * 100)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;