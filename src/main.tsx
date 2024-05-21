import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ComprarCarros from './pages/listar/ComprarCarros'
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ComprarCarros />} />
      </Routes>
    </Router>
  </React.StrictMode>
)