import './UserComponent.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserComponent(props) {
  return (
    <div className="user-box">
      <img src={props.profile} alt={`${props.username}'s profile`} className="profile-img rounded-border" />
      <h1 className="username">{props.username}</h1>
      <p className="user-info">Posts: {props.posts}</p>
      <p className="user-info">Connections: {props.connections}</p>
      <Button as={Link} to={`/user-profile/${props.username}`} variant="primary">View Profile</Button>
    </div>
  );
}

UserComponent.propTypes = {
  username: PropTypes.string.isRequired,
  posts: PropTypes.number.isRequired,
  profile: PropTypes.string.isRequired,
  connections: PropTypes.number.isRequired
};

export default UserComponent;