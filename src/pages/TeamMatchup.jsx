import { useState } from "react";
import { Container, Row, Col, Card, ListGroup, Badge, Dropdown, DropdownButton } from "react-bootstrap";
import { useFantasyTeams } from "../context/FantasyTeamsContext";

export default function TeamMatchup() {
  const { fantasyTeams, limits } = useFantasyTeams();

  const [team1Id, setTeam1Id] = useState(fantasyTeams[0]?.id || "");
  const [team2Id, setTeam2Id] = useState(fantasyTeams[1]?.id || "");

  const team1 = fantasyTeams.find(t => t.id === team1Id);
  const team2 = fantasyTeams.find(t => t.id === team2Id);

  const buildStarters = team => {
    if (!team) return {};
    const starters = {};
    Object.entries(limits.positions).forEach(([pos, max]) => {
      starters[pos] = team.players
        .filter(p => p.position === pos && !p.isBench)
        .slice(0, max);
    });
    return starters;
  };

  const starters1 = buildStarters(team1);
  const starters2 = buildStarters(team2);

  const renderTeamCard = (team, starters) => {
    if (!team) {
      return <p className="text-center text-muted">Select a team</p>;
    }

    return (
      <Card>
        <Card.Body>
          <Card.Title as="h2" className="text-center mb-3">
            {team.name}
          </Card.Title>

          {Object.entries(limits.positions).map(([pos, max]) => {
            const playersAtPos = starters[pos] || [];

            return (
              <div key={pos} className="mb-3">
                <ListGroup>
                  {Array.from({ length: max }).map((_, idx) => {
                    const player = playersAtPos[idx];
                    return (
                      <ListGroup.Item
                        key={idx}
                        className="d-flex align-items-center"
                      >
                        <Badge
                          bg="secondary"
                          className="me-3"
                          style={{ minWidth: "60px", textAlign: "center" }}
                        >
                          {pos}
                        </Badge>
                        <span className={player ? "" : "text-muted fst-italic"}>
                          {player ? player.full_name : "Empty Slot"}
                        </span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Team Matchup</h1>

      <Row className="g-4">
        <Col xs={12} md={6}>
          <DropdownButton
            title={team1?.name || "Select Team 1"}
            className="mb-3"
            onSelect={id => setTeam1Id(id)}
          >
            {fantasyTeams.map(team => (
              <Dropdown.Item key={team.id} eventKey={team.id}>
                {team.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          {renderTeamCard(team1, starters1)}
        </Col>

        <Col xs={12} md={6}>
          <DropdownButton
            title={team2?.name || "Select Team 2"}
            className="mb-3"
            onSelect={id => setTeam2Id(id)}
          >
            {fantasyTeams.map(team => (
              <Dropdown.Item key={team.id} eventKey={team.id}>
                {team.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          {renderTeamCard(team2, starters2)}
        </Col>
      </Row>
    </Container>
  );
}
