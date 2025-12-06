import { Card } from "react-bootstrap";
import "../styles/PlayerInfoCard.css";

export default function PlayerInfoCard({ player }) {
  if (!player) return null;

  const {
    full_name,
    position,
    team,
    number,
    age,
    years_exp,
    college,
    status,
  } = player;

  return (
    <Card className="player-card">
      <Card.Body>
        <Card.Title>
          {full_name} #{number}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {position} {team && `• ${team}`}
        </Card.Subtitle>

        <p><strong>Status:</strong> {status}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Experience:</strong> {years_exp} years</p>
        <p><strong>College:</strong> {college || "Unknown"}</p>
      </Card.Body>
    </Card>
  );
}
