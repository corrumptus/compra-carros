import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ActionBar from './ActionBar'
import ComprarCarros from './pages/listar/ComprarCarros'
import CadastrarCarro from './pages/cadastrar/CadastrarCarro'
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ActionBar />
      <Routes>
        <Route path="/" element={<ComprarCarros />} />
        <Route path="/carro" element={<CadastrarCarro />} />
      </Routes>
    </Router>
  </React.StrictMode>
)