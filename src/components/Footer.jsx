import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">EventHub</div>

        <p className="footer-text">
          Event Management System • Web Programming Assignment 2
        </p>

        <div className="footer-links">
          <Link to="/">Events</Link>
          <Link to="/my-events">My Events</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
