import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router";

export default function Home() {
  return (
    <Container fluid className="py-5" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1 className="display-4 fw-bold">
            Welcome to <span className="text-primary">P22 Fantasy</span>
          </h1>
          <p className="lead mt-3">
            Manage your team, dominate your league, and stay ahead with live stats,
            player insights, and weekly matchups.
          </p>
          <Link to="/draft">
            <Button variant="primary" size="lg" className="mt-3">
              Get Started
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="g-4 justify-content-center">
        <Col xs={12} md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Live Player Stats</Card.Title>
              <Card.Text>
                Stay updated with real-time scoring and player performance to make
                the best decisions each week.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Team Management</Card.Title>
              <Card.Text>
                Adjust your roster, set your lineup, and track injuries with an
                intuitive interface.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>League Insights</Card.Title>
              <Card.Text>
                View standings, weekly projections, and power rankings to stay ahead
                of your rivals.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
