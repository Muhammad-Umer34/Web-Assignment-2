import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span>🎟️</span>
          <span>EventHub</span>
        </div>

        <p className="footer-text">
          Powered by Ticketmaster Discovery API • Built with React & Redux Toolkit
        </p>

        <div className="footer-links">
          <Link to="/">Events</Link>
          <Link to="/my-events">My Registrations</Link>
          <a
            href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Docs ↗
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
