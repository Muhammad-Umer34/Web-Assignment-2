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
          EventHub
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Events
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
              <span className="user-greeting">
                Hello, <strong>{currentUser?.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
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
