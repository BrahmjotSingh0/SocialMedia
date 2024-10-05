import { useState, useEffect } from 'react';
import axios from 'axios';
import UserComponent from './UserComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserListPage.css';
import urlconfig from '../../urlconfig';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${urlconfig.API_URL}/users`);
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container user-list-page">
      <h1 className='page-name'>User List Page</h1>
      <input
        type="text"
        placeholder="Search by username"
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredUsers.map((user, index) => (
          <div className="col-md-6" key={index}>
            <UserComponent
              username={user.username}
              posts={user.postsCount}
              profile={user.profilePicture}
              followers={user.connectionsCount}
              following={user.connectionsUsernames.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserListPage;