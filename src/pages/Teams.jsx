import { Container, Row, Col, Card } from "react-bootstrap";
import TeamRoster from "../components/TeamRoster";

const fantasyTeams = [
  { id: "team1", name: "John's Scary Squad", players: ["17", "1339"] },
  { id: "team2", name: "Tomasz's Terrifying Team", players: ["650", "2334"] }
];

export default function Teams() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Your Fantasy Teams</h1>

      <Row className="g-4">
        {fantasyTeams.map((team) => (
          <Col xs={12} md={6} key={team.id}>
            <Card className="shadow-sm p-3">
              <h3 className="text-center">{team.name}</h3>
              <TeamRoster fantasyTeam={team} />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
