import { createContext, useContext, useEffect, useState } from "react";

const FantasyTeamsContext = createContext();

const DEFAULT_TEAMS = [
  { id: "team1", name: "Team One", players: [] },
  { id: "team2", name: "Team Two", players: [] }
];

const DEFAULT_LIMITS = {
  rosterSize: 15,
  positions: {
    QB: 1,
    RB: 2,
    WR: 2,
    TE: 1,
    K: 1
  }
};

export function FantasyTeamsProvider({ children }) {
  const [fantasyTeams, setFantasyTeams] = useState(() => {
    const stored = localStorage.getItem("fantasyTeams");
    return stored ? JSON.parse(stored) : DEFAULT_TEAMS;
  });

  const [draftedPlayerIds, setDraftedPlayerIds] = useState(() => {
    const stored = localStorage.getItem("draftedPlayerIds");
    return stored ? JSON.parse(stored) : [];
  });

  const [limits, setLimits] = useState(() => {
    const stored = localStorage.getItem("fantasyLimits");
    return stored ? JSON.parse(stored) : DEFAULT_LIMITS;
  });

  useEffect(() => {
    localStorage.setItem("fantasyTeams", JSON.stringify(fantasyTeams));
  }, [fantasyTeams]);

  useEffect(() => {
    localStorage.setItem("draftedPlayerIds", JSON.stringify(draftedPlayerIds));
  }, [draftedPlayerIds]);

  useEffect(() => {
    localStorage.setItem("fantasyLimits", JSON.stringify(limits));
  }, [limits]);

  const draftPlayer = (player, teamId) => {
    setFantasyTeams(prev =>
      prev.map(team => {
        if (team.id !== teamId) return team;

        if (team.players.length >= limits.rosterSize) {
          alert("This team's roster is full.");
          return team;
        }

        const startersAtPos = team.players.filter(
          p => p.position === player.position
        ).length;

        const maxStarters = limits.positions[player.position] || 0;

        const draftedPlayer = {
          ...player,
          isBench: startersAtPos >= maxStarters
        };

        return {
          ...team,
          players: [...team.players, draftedPlayer]
        };
      })
    );

    setDraftedPlayerIds(prev => [...prev, player.player_id]);
  };

  const updateTeams = newTeams => {
    setFantasyTeams(newTeams);
    setDraftedPlayerIds([]);
    localStorage.removeItem("draftedPlayerIds");
  };

  const updateLimits = newLimits => {
    setLimits(newLimits);
  };

  const swapPlayerPosition = (teamId, starter, bench) => {
    setFantasyTeams(prev =>
      prev.map(team => {
        if (team.id !== teamId) return team;

        return {
          ...team,
          players: team.players.map(p => {
            if (p.player_id === starter.player_id) {
              return { ...bench, isBench: false };
            }
            if (p.player_id === bench.player_id) {
              return { ...starter, isBench: true };
            }
            return p;
          })
        };
      })
    );
  };

  return (
    <FantasyTeamsContext.Provider
      value={{
        fantasyTeams,
        draftedPlayerIds,
        limits,
        draftPlayer,
        updateTeams,
        updateLimits,
        swapPlayerPosition
      }}
    >
      {children}
    </FantasyTeamsContext.Provider>
  );
}

export function useFantasyTeams() {
  return useContext(FantasyTeamsContext);
}
