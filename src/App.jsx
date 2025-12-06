import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Teams from './pages/Teams'
import Draft from './pages/Draft'
import Settings from './pages/Settings'
import TeamMatchup from './pages/TeamMatchup'
import NavBar from './components/NavBar'
import { FantasyTeamsProvider } from "./context/FantasyTeamsContext";

function App() {
  return (
    <FantasyTeamsProvider>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/matchup" element={<TeamMatchup />} />
        </Routes>
      </HashRouter>
    </FantasyTeamsProvider>
  )
}

export default App
