import './App.css'
import { HashRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Teams from './pages/Teams'
import Draft from './pages/Draft'
import Settings from './pages/Settings'
import NavBar from './components/NavBar'

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  )
}

export default App
