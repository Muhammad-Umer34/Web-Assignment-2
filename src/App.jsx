import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <h1>Discover & Explore Events</h1>
                  <p style={{ color: '#64748b', marginTop: '10px' }}>
                    Welcome to EventHub. Event exploration coming right up!
                  </p>
                </div>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
