import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  cancelRegistration,
  clearRegistrationFeedback,
} from '../store/registrationsSlice'
import './MyEventsPage.css'

function MyEventsPage() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('upcoming') // 'all' | 'upcoming' | 'completed'

  const { currentUser } = useSelector((state) => state.auth)
  const { registrations, successMessage } = useSelector(
    (state) => state.registrations
  )

  const userRegistrations = registrations.filter(
    (reg) => reg.userEmail === currentUser?.email
  )

  const today = new Date().toISOString().split('T')[0]

  const upcomingEvents = userRegistrations.filter((r) => {
    return !r.eventDate || r.eventDate >= today
  })

  const completedEvents = userRegistrations.filter((r) => {
    return r.eventDate && r.eventDate < today
  })

  const displayedEvents =
    activeTab === 'upcoming'
      ? upcomingEvents
      : activeTab === 'completed'
      ? completedEvents
      : userRegistrations

  const handleCancel = (regId, eventName) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your registration for "${eventName}"?`
    )
    if (confirmed) {
      dispatch(cancelRegistration(regId))
    }
  }

  return (
    <div className="container">
      <div className="my-events-header">
        <h1>My Registered Events</h1>
        <p>Review and manage your event bookings.</p>
      </div>

      {successMessage && (
        <div
          className="alert alert-success"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>{successMessage}</span>
          <button
            onClick={() => dispatch(clearRegistrationFeedback())}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#166534' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="my-events-tabs">
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({upcomingEvents.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completedEvents.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({userRegistrations.length})
        </button>
      </div>

      {/* Registrations List */}
      {displayedEvents.length === 0 ? (
        <div className="empty-state">
          <h3>No {activeTab !== 'all' ? activeTab : ''} events found</h3>
          <p style={{ color: '#64748b', marginTop: '4px' }}>
            {activeTab === 'upcoming'
              ? 'You have not registered for any upcoming events yet.'
              : 'You do not have any past completed events.'}
          </p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '14px' }}>
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="registrations-list">
          {displayedEvents.map((reg) => {
            const isPast = reg.eventDate && reg.eventDate < today

            return (
              <div key={reg.id} className="reg-card">
                <div className="reg-card-left">
                  <img
                    src={reg.eventImage}
                    alt={reg.eventName}
                    className="reg-thumb"
                  />
                  <div className="reg-info">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        className={`badge ${
                          isPast ? 'badge-completed' : 'badge-upcoming'
                        }`}
                      >
                        {isPast ? 'Completed' : 'Upcoming'}
                      </span>
                      <span className="badge badge-category">
                        {reg.eventCategory}
                      </span>
                    </div>

                    <h3 className="reg-title">{reg.eventName}</h3>

                    <div className="reg-details">
                      <span>
                        <strong>Date:</strong> {reg.eventDate} {reg.eventTime && `at ${reg.eventTime}`}
                      </span>
                      <span>
                        <strong>Venue:</strong> {reg.eventVenue}{reg.eventCity ? `, ${reg.eventCity}` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="reg-card-right">
                  <Link
                    to={`/events/${reg.eventId}`}
                    className="btn btn-outline"
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  >
                    Details
                  </Link>

                  {!isPast && (
                    <button
                      onClick={() => handleCancel(reg.id, reg.eventName)}
                      className="btn btn-danger"
                      style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyEventsPage
