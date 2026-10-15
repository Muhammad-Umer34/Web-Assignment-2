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

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!email.trim() || !password.trim()) {
      setFormError('Please enter your email and password.')
      return
    }

    dispatch(loginUser({ email, password }))
  }

  const handleDemoLogin = () => {
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
          <h2>Login</h2>
          <p>Sign in to manage your event registrations</p>
        </div>

        {formError && <div className="alert alert-danger">{formError}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="user@example.com"
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
            Sign In
          </button>
        </form>

        <div className="demo-box">
          <span>Demo: demo@eventhub.com / password123</span>
          <button type="button" onClick={handleDemoLogin} className="demo-btn">
            Autofill
          </button>
        </div>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
