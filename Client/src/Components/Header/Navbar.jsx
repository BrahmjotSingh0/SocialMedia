import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaPlusSquare, FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Navbar.css'; 
import logo from '../../../assets/logo.png';

function Header({ user, onLogout }) {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Social Media Logo" className="logo" />
          <span>PostItUp</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/users">
              <FaUserFriends size={24} />
            </Nav.Link>
            <Nav.Link as={Link} to="/add-post">
              <FaPlusSquare size={24} />
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to={`/user-profile/${user.username}`}>
                  <FaUser size={24} />
                </Nav.Link>
                <Nav.Link onClick={onLogout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <FaSignInAlt size={24} />
                </Nav.Link>
                <Nav.Link as={Link} to="/register" eventKey={2}>
                  <FaUserPlus size={24} />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Header;