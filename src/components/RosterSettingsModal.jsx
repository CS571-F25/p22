import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFantasyTeams } from "../context/FantasyTeamsContext";

export default function RosterSettingsModal({ show, onHide }) {
  const { limits, updateLimits } = useFantasyTeams();

  const [rosterSize, setRosterSize] = useState(limits.rosterSize);
  const [positions, setPositions] = useState(limits.positions);

  function handlePositionChange(pos, value) {
    setPositions({
      ...positions,
      [pos]: Number(value),
    });
  }

  function handleSave() {
    const totalPositions = Object.values(positions).reduce((sum, n) => sum + n, 0);

    if (rosterSize < totalPositions) {
      alert(
        `Roster size must be at least ${totalPositions} to fit all position slots.`
      );
      return;
    }

    updateLimits({
      rosterSize,
      positions,
    });
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Roster Rules</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3" controlId="rosterSize">
          <Form.Label>Max Roster Size</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={rosterSize}
            onChange={(e) => setRosterSize(Number(e.target.value))}
          />
        </Form.Group>

        {Object.entries(positions).map(([pos, max]) => {
          const inputId = `position-${pos}`;
          return (
            <Form.Group key={pos} className="mb-2" controlId={inputId}>
              <Form.Label>{pos} Slots</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={max}
                onChange={(e) => handlePositionChange(pos, e.target.value)}
              />
            </Form.Group>
          );
        })}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Roster Rules
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
