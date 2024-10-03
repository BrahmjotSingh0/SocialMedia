import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaPlusSquare, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './Navbar.css'; 
import logo from '../../../public/assets/logo.png';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary rounded custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Social Media Logo" className="logo" />
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
            <Nav.Link as={Link} to="/login">
              <FaSignInAlt size={24} />
            </Nav.Link>
            <Nav.Link as={Link} to="/register" eventKey={2}>
              <FaUserPlus size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;