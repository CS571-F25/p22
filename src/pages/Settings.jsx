import { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useFantasyTeams } from "../context/FantasyTeamsContext";
import TeamSettingsModal from "../components/TeamSettingsModal";
import RosterSettingsModal from "../components/RosterSettingsModal";

export default function Settings() {
  const { fantasyTeams, limits } = useFantasyTeams();

  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [showRosterModal, setShowRosterModal] = useState(false);

  return (
    <Container fluid className="py-5 px-4">
      <h1 className="text-center mb-4">League Settings</h1>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                Teams
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => setShowTeamsModal(true)}
                >
                  Edit
                </Button>
              </Card.Title>

              <p className="mt-3 fw-bold">Total Teams: {fantasyTeams.length}</p>

              <ListGroup className="mt-2">
                {fantasyTeams.map(team => (
                  <ListGroup.Item key={team.id}>{team.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                Roster Rules
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => setShowRosterModal(true)}
                >
                  Edit
                </Button>
              </Card.Title>

              <p className="mt-3 fw-bold">
                Max Roster Size: {limits.rosterSize}
              </p>

              <ListGroup className="mt-2">
                {Object.entries(limits.positions).map(([pos, max]) => (
                  <ListGroup.Item
                    key={pos}
                    className="d-flex justify-content-between"
                  >
                    <span>{pos}</span>
                    <strong>{max}</strong>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <TeamSettingsModal
        show={showTeamsModal}
        onHide={() => setShowTeamsModal(false)}
      />

      <RosterSettingsModal
        show={showRosterModal}
        onHide={() => setShowRosterModal(false)}
      />
    </Container>
  );
}
