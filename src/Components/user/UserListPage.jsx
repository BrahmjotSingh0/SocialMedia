import UserComponent from './UserComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const users = [
  {
    username: 'user1',
    posts: 10,
    profile: 'https://randomuser.me/api/portraits/men/70.jpg',
    followers: 100,
    following: 50
  },
  {
    username: 'user2',
    posts: 20,
    profile: 'https://randomuser.me/api/portraits/men/33.jpg',
    followers: 200,
    following: 150
  },
  {
    username: 'user3',
    posts: 30,
    profile: 'https://randomuser.me/api/portraits/men/82.jpg',
    followers: 300,
    following: 250
  }
];

function UserListPage() {
  return (
    <div className="container">
      <h1 className='page-name'>User List Page</h1>
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-6" key={index}>
            <UserComponent
              username={user.username}
              posts={user.posts}
              profile={user.profile}
              followers={user.followers}
              following={user.following}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListPage;