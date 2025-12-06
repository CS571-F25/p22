import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router";

export default function Home() {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "80vh", boxSizing: "border-box" }}
    >
      <Row className="justify-content-center text-center mb-3 w-100">
        <Col md={8}>
          <h1 className="display-4 fw-bold">
            Welcome to <span className="text-primary">P22 Fantasy</span>
          </h1>
        </Col>
      </Row>

      <Row className="justify-content-center text-center mb-4 w-100">
        <Col md={8}>
          <p className="lead">
            Create your team and practice drafting players in a realistic setup.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center text-center mb-3 w-100">
        <Col md={8}>
          <Link to="/draft">
            <Button variant="primary" size="lg">Start Drafting Now</Button>
          </Link>
        </Col>
      </Row>

      <Row className="justify-content-center text-center w-100">
        <Col md={8}>
          <Link to="/settings">
            <Button variant="secondary" size="lg">League Settings</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
