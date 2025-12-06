import { Card, ListGroup } from "react-bootstrap";

export default function TeamRoster({ team }) {
  if (!team || !team.players) return null;

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title>{team.name}</Card.Title>

        <ListGroup className="mt-3">
          {team.players.length === 0 ? (
            <ListGroup.Item>No players drafted yet</ListGroup.Item>
          ) : (
            team.players.map((player) => (
              <ListGroup.Item key={player.player_id}>
                {player.full_name} — {player.position}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
