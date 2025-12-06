import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFantasyTeams } from "../context/FantasyTeamsContext";

export default function TeamSettingsModal({ show, onHide }) {
  const { fantasyTeams, updateTeams } = useFantasyTeams();

  const [teamCount, setTeamCount] = useState(fantasyTeams.length);
  const [teamNames, setTeamNames] = useState(fantasyTeams.map((t) => t.name));

  function handleTeamCountChange(count) {
    setTeamCount(count);
    setTeamNames((prev) => {
      const updated = [...prev];
      while (updated.length < count) updated.push(`Team ${updated.length + 1}`);
      return updated.slice(0, count);
    });
  }

  function handleSave() {
    const newTeams = teamNames.slice(0, teamCount).map((name, i) => ({
      id: `team${i + 1}`,
      name,
      players: [],
    }));

    updateTeams(newTeams);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Teams</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3" controlId="teamCount">
          <Form.Label>Number of Teams</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={12}
            value={teamCount}
            onChange={(e) => handleTeamCountChange(Number(e.target.value))}
          />
        </Form.Group>

        {teamNames.slice(0, teamCount).map((name, idx) => {
          const inputId = `teamName${idx}`;
          return (
            <Form.Group key={idx} className="mb-2" controlId={inputId}>
              <Form.Label>Team {idx + 1} Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  const updated = [...teamNames];
                  updated[idx] = e.target.value;
                  setTeamNames(updated);
                }}
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
          Save Teams
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
