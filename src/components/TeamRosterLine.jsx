import { Card } from "react-bootstrap";

export default function TeamRosterLine({ player }) {
  return (
    <Card className="p-2 mb-2 shadow-sm">
      <div className="d-flex justify-content-between">
        <strong>{player.full_name}</strong>
        <span>{player.position}</span>
      </div>
    </Card>
  );
}
