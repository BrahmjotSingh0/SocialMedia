import './UserComponent.css';
import { Button } from 'react-bootstrap';

function UserComponent(props) {
  return (
    <div className="user-box">
      <img src={props.profile} alt={`${props.username}'s profile`} className="profile-img" />
      <h1>{props.username}</h1>
      <p>Posts: {props.posts}</p>
      <p>Followers: {props.followers}</p>
      <p>Following: {props.following}</p>
      <Button variant="primary">View Profile</Button>
    </div>
  );
}

export default UserComponent;