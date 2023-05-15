import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard'
import CalenderView from './CalenderView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/calenderview" element={<CalenderView />} />
      </Routes>
    </BrowserRouter>
  )
}
