import { useState } from "react";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import { useFantasyTeams } from "../context/FantasyTeamsContext";
import PositionSwapModal from "../components/PositionSwapModal";

export default function Teams() {
  const { fantasyTeams, limits } = useFantasyTeams();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activeTeam, setActiveTeam] = useState(null);

  const openSwapModal = (team, player, isBench, emptySlot = false) => {
    setActiveTeam(team);
    setSelectedPlayer({ ...player, isBench, emptySlot });
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Fantasy Teams</h1>

      <Row className="g-4">
        {fantasyTeams.map(team => {
          const startersByPosition = {};
          Object.entries(limits.positions).forEach(([pos, max]) => {
            startersByPosition[pos] = team.players
              .filter(p => p.position === pos && !p.isBench)
              .slice(0, max);
          });

          const benchPlayers = team.players.filter(player => {
            const starters = startersByPosition[player.position] || [];
            return !starters.some(s => s.player_id === player.player_id);
          });

          return (
            <Col md={6} key={team.id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="text-center mb-4">
                    {team.name}
                  </Card.Title>

                  {Object.entries(limits.positions).map(([pos, max]) => {
                    const playersAtPos = startersByPosition[pos] || [];

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
                                  style={{
                                    minWidth: "60px",
                                    cursor: "pointer",
                                    textAlign: "center"
                                  }}
                                  onClick={() =>
                                    openSwapModal(
                                      team,
                                      player,
                                      false,
                                      !player
                                    )
                                  }
                                >
                                  {pos}
                                </Badge>

                                <span
                                  className={
                                    player ? "" : "text-muted fst-italic"
                                  }
                                >
                                  {player ? player.full_name : "Empty Slot"}
                                </span>
                              </ListGroup.Item>
                            );
                          })}
                        </ListGroup>
                      </div>
                    );
                  })}

                  <div className="mt-4">
                    <p className="fw-bold mb-2 text-center">Bench</p>

                    <ListGroup>
                      {benchPlayers.length === 0 ? (
                        <ListGroup.Item className="text-muted fst-italic text-center">
                          No bench players
                        </ListGroup.Item>
                      ) : (
                        benchPlayers.map(player => (
                          <ListGroup.Item
                            key={player.player_id}
                            className="d-flex align-items-center"
                          >
                            <Badge
                              bg="dark"
                              className="me-3"
                              style={{
                                minWidth: "60px",
                                cursor: "pointer",
                                textAlign: "center"
                              }}
                              onClick={() =>
                                openSwapModal(team, player, true)
                              }
                            >
                              {player.position}
                            </Badge>

                            <span>{player.full_name}</span>
                          </ListGroup.Item>
                        ))
                      )}
                    </ListGroup>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <PositionSwapModal
        show={!!selectedPlayer}
        onHide={() => setSelectedPlayer(null)}
        team={activeTeam}
        selectedPlayer={selectedPlayer}
      />
    </Container>
  );
}
