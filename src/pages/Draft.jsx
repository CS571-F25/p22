import { Container, Row, Col } from "react-bootstrap";
import PlayerInfoCard from "../components/PlayerInfoCard";
import players from "../data/players.json";

export default function Draft() {
  const playerList = Object.values(players);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Draft Page</h1>
      <p className="text-center mb-5">
        This page displays all available fantasy-relevant players.
      </p>

      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {playerList.map((player) => (
          <Col key={player.player_id}>
            <PlayerInfoCard player={player} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
