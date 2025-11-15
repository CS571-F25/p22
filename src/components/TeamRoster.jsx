import { Container } from "react-bootstrap";
import TeamRosterLine from "./TeamRosterLine";

export default function TeamRoster({ fantasyTeam }) {
  if (!fantasyTeam) return null;

  const fullPlayers = fantasyTeam.players;

  return (
    <Container className="mt-3">
      {fullPlayers.length === 0 ? (
        <p className="text-center text-muted">No players on this team yet.</p>
      ) : (
        fullPlayers.map((player) => (
          <TeamRosterLine key={player.player_id} player={player} />
        ))
      )}
    </Container>
  );
}
