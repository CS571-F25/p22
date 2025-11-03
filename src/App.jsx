import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AboutMe from './components/AboutMe'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about-me" element={<AboutMe/>} />
      </Routes>
    </HashRouter>
  )
}

export default App
