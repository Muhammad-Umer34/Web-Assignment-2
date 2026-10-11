import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/authSlice'
import './Navbar.css'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="nav-brand">
          <span className="nav-brand-icon">🎟️</span>
          <span>EventHub</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Explore Events
          </Link>
          {isAuthenticated && (
            <Link to="/my-events" className="nav-link">
              My Events
            </Link>
          )}
        </nav>

        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <div className="user-greeting">
                <span>👤</span>
                <span>{currentUser?.name}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
