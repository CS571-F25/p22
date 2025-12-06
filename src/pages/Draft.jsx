import { useState, useMemo } from "react";
import { Container, Row, Col, Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import PlayerInfoCard from "../components/PlayerInfoCard";
import { useFantasyTeams } from "../context/FantasyTeamsContext";
import playersData from "../data/players.json";

export default function Draft() {
  const { fantasyTeams, draftPlayer, draftedPlayerIds } = useFantasyTeams();

  const [selectedTeamId, setSelectedTeamId] = useState(
    fantasyTeams[0]?.id || ""
  );
  const [positionFilter, setPositionFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const playersList = useMemo(() => {
    if (!playersData) return [];
    return Array.isArray(playersData) ? playersData : Object.values(playersData);
  }, [playersData]);

  const filteredPlayers = useMemo(() => {
    return playersList
      .filter(p => p && !draftedPlayerIds.includes(p.player_id))
      .filter(p => (positionFilter === "ALL" ? true : p.position === positionFilter))
      .filter(p =>
        searchQuery.trim()
          ? p.full_name.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      );
  }, [playersList, draftedPlayerIds, positionFilter, searchQuery]);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Draft Players</h1>

      <Row className="mb-3 justify-content-center">
        <Col md={4}>
          <DropdownButton
            title={
              fantasyTeams.find(t => t.id === selectedTeamId)?.name ||
              "Select Team"
            }
            onSelect={value => setSelectedTeamId(value)}
          >
            {fantasyTeams.map(team => (
              <Dropdown.Item key={team.id} eventKey={team.id}>
                {team.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center">
        <Col md={6} className="text-center">
          <Button
            variant={positionFilter === "ALL" ? "primary" : "outline-primary"}
            className="me-2 mb-2"
            onClick={() => setPositionFilter("ALL")}
          >
            All
          </Button>

          {["QB", "RB", "WR", "TE", "K"].map(pos => (
            <Button
              key={pos}
              variant={positionFilter === pos ? "primary" : "outline-primary"}
              className="me-2 mb-2"
              onClick={() => setPositionFilter(pos)}
            >
              {pos}
            </Button>
          ))}
        </Col>
      </Row>

      <Form.Group controlId="playerSearch">
        <Form.Label className="visually-hidden">Search Players by Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search player by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      <Row className="g-4">
        {filteredPlayers.length === 0 ? (
          <Col>
            <p className="text-center text-muted">No players match the filter.</p>
          </Col>
        ) : (
          filteredPlayers.map(player => (
            <Col key={player.player_id} md={4}>
              <PlayerInfoCard player={player} />
              <Button
                className="mt-2 w-100"
                disabled={!selectedTeamId}
                onClick={() => draftPlayer(player, selectedTeamId)}
              >
                Draft to{" "}
                {fantasyTeams.find(t => t.id === selectedTeamId)?.name || "Team"}
              </Button>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
