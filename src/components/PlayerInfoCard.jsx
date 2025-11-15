import { Card, Badge } from "react-bootstrap";
import "../styles/PlayerInfoCard.css";

export default function PlayerInfoCard({ player }) {
  if (!player) return null;

  const {
    full_name,
    position,
    fantasy_positions,
    team,
    number,
    age,
    height,
    weight,
    college,
    status,
    injury_status,
    injury_notes,
    years_exp,
    birth_date,
    depth_chart_position,
  } = player;

  return (
    <Card className="h-100 shadow-sm player-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{full_name}</Card.Title>
          <Badge bg="secondary" pill>#{number}</Badge>
        </div>

        <div className="mb-3">
          <Badge bg="primary" className="me-2">{position}</Badge>
          {team && <Badge bg="dark">{team}</Badge>}
        </div>

        <Card.Text className="text-start small">
          <strong>Fantasy Positions:</strong> {fantasy_positions?.join(", ") || "N/A"} <br />
          <strong>Status:</strong> {status} <br />

          {injury_status && (
            <>
              <strong>Injury:</strong> {injury_status}
              {injury_notes ? ` - ${injury_notes}` : ""} <br />
            </>
          )}

          <strong>Age:</strong> {age} <br />
          <strong>Experience:</strong> {years_exp} years <br />
          <strong>College:</strong> {college || "Unknown"} <br />

          <strong>Height:</strong> {height ? `${height} in` : "N/A"} <br />
          <strong>Weight:</strong> {weight ? `${weight} lbs` : "N/A"} <br />

          {birth_date && (
            <>
              <strong>Birth Date:</strong> {birth_date} <br />
            </>
          )}

          {depth_chart_position && (
            <>
              <strong>Depth Chart Position:</strong> {depth_chart_position}
            </>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
