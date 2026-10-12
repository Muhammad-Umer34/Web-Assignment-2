import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser, clearAuthError } from '../store/authSlice'
import './Auth.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error, users } = useSelector((state) => state.auth)

  // Clear previous errors when page loads
  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setFormError('Please enter both email and password.')
      return
    }

    dispatch(loginUser({ email, password }))
  }

  // Quick helper to fill demo account for testing
  const handleDemoLogin = () => {
    // If demo user doesn't exist, create it first
    const demoEmail = 'demo@eventhub.com'
    const demoPass = 'password123'
    const exists = users.find((u) => u.email === demoEmail)
    if (!exists) {
      dispatch(registerUser({ name: 'Demo Student', email: demoEmail, password: demoPass }))
    } else {
      dispatch(loginUser({ email: demoEmail, password: demoPass }))
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back!</h2>
          <p>Login to your account to manage your events</p>
        </div>

        {formError && <div className="alert alert-danger">{formError}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="alert alert-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>💡 Quick test: Click to use demo credentials</span>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn btn-outline"
            style={{ padding: '4px 10px', fontSize: '0.8rem', background: '#fff' }}
          >
            Demo Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one here</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
