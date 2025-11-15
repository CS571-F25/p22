import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand href="#">Fantasy Mock Draft</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/draft">Draft</Nav.Link>
            <Nav.Link as={NavLink} to="/teams">Teams</Nav.Link>
            <Nav.Link as={NavLink} to="/settings">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
