import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary rounded">
      <Container>
        <Navbar.Brand as={Link} to="/">Social Media</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Users</Nav.Link>
            <Nav.Link as={Link} to="/add-post">Add Post</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/signin">Signin</Nav.Link>
            <Nav.Link as={Link} to="/signup" eventKey={2}>
              SignUp
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;