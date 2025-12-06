import { Modal, Button, ListGroup } from "react-bootstrap";
import { useFantasyTeams } from "../context/FantasyTeamsContext";

export default function PositionSwapModal({ show, onHide, team, selectedPlayer }) {
  const { swapPlayerPosition } = useFantasyTeams();

  if (!team || !selectedPlayer) return null;

  const isStarter = !selectedPlayer.isBench;
  const isEmptySlot = selectedPlayer.emptySlot;

  let eligiblePlayers = [];

  if (selectedPlayer.isBench) {
    eligiblePlayers = team.players.filter(
      p => p.position === selectedPlayer.position && !p.isBench
    );
  } else if (isEmptySlot) {
    eligiblePlayers = team.players.filter(
      p => p.position === selectedPlayer.position && p.isBench
    );
  } else {
    eligiblePlayers = team.players.filter(
      p => p.position === selectedPlayer.position && p.isBench
    );
  }

  const handleSwap = target => {
    const starter = selectedPlayer.isBench ? target : selectedPlayer;
    const bench = selectedPlayer.isBench ? selectedPlayer : target;

    swapPlayerPosition(team.id, starter, bench);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEmptySlot
            ? `Fill ${selectedPlayer.position} Slot`
            : selectedPlayer.isBench
            ? `Move ${selectedPlayer.full_name} to Starter`
            : `Swap ${selectedPlayer.full_name}`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="fw-bold text-center">
          {selectedPlayer.full_name || "Empty Slot"}
        </p>

        {eligiblePlayers.length === 0 ? (
          <p className="text-muted text-center fst-italic">
            No eligible players to swap.
          </p>
        ) : (
          <ListGroup>
            {eligiblePlayers.map(player => (
              <ListGroup.Item
                key={player.player_id}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{player.full_name}</span>
                <Button size="sm" onClick={() => handleSwap(player)}>
                  {isEmptySlot ? "Place Here" : "Swap"}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
    </Modal>
  );
}
