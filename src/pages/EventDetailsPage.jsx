import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventDetails, clearSelectedEvent } from '../store/eventsSlice'
import {
  registerForEvent,
  clearRegistrationFeedback,
} from '../store/registrationsSlice'
import './EventDetailsPage.css'

function EventDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { selectedEvent, detailStatus, error } = useSelector(
    (state) => state.events
  )
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth)
  const { registrations, successMessage, errorMessage } = useSelector(
    (state) => state.registrations
  )

  useEffect(() => {
    dispatch(fetchEventDetails(id))
    return () => {
      dispatch(clearSelectedEvent())
      dispatch(clearRegistrationFeedback())
    }
  }, [dispatch, id])

  if (detailStatus === 'loading') {
    return (
      <div className="container spinner-container">
        <div className="spinner"></div>
        <p>Loading event information...</p>
      </div>
    )
  }

  if (detailStatus === 'failed' || (!selectedEvent && detailStatus === 'succeeded')) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="alert alert-danger">
          <h3>Event Not Found</h3>
          <p>{error || 'The requested event could not be located.'}</p>
        </div>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Events
        </Link>
      </div>
    )
  }

  if (!selectedEvent) return null

  // Extract event data safely
  const imageUrl =
    selectedEvent.images?.find((img) => img.ratio === '16_9')?.url ||
    selectedEvent.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'

  const eventDate = selectedEvent.dates?.start?.localDate || 'Date TBA'
  const eventTime = selectedEvent.dates?.start?.localTime
    ? selectedEvent.dates.start.localTime.substring(0, 5)
    : ''

  const venue = selectedEvent._embedded?.venues?.[0]?.name || 'Venue TBA'
  const city = selectedEvent._embedded?.venues?.[0]?.city?.name || ''
  const address = selectedEvent._embedded?.venues?.[0]?.address?.line1 || ''
  const country = selectedEvent._embedded?.venues?.[0]?.country?.name || ''
  const locationString = [address, city, country].filter(Boolean).join(', ')

  const category =
    selectedEvent.classifications?.[0]?.segment?.name || 'General'
  const genre = selectedEvent.classifications?.[0]?.genre?.name || ''

  const price = selectedEvent.priceRanges?.[0]
    ? `$${selectedEvent.priceRanges[0].min} - $${selectedEvent.priceRanges[0].max} (${selectedEvent.priceRanges[0].currency})`
    : 'Free / Standard Admission'

  // Check if currently logged in user is already registered for this event
  const isRegistered =
    isAuthenticated &&
    registrations.some(
      (r) => r.eventId === selectedEvent.id && r.userEmail === currentUser?.email
    )

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    dispatch(
      registerForEvent({
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        eventDate,
        eventTime,
        eventVenue: venue,
        eventCity: city,
        eventImage: imageUrl,
        eventCategory: category,
        userEmail: currentUser.email,
        userName: currentUser.name,
      })
    )
  }

  return (
    <div className="container details-container">
      <Link to="/" className="back-link">
        ← Back to all events
      </Link>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="details-card">
        {/* Banner with Event Title */}
        <div className="details-banner">
          <img src={imageUrl} alt={selectedEvent.name} className="details-image" />
          <div className="details-overlay">
            <span className="badge badge-category">{category} {genre ? `• ${genre}` : ''}</span>
            <h1>{selectedEvent.name}</h1>
          </div>
        </div>

        {/* Details Body */}
        <div className="details-body">
          {/* Main Content */}
          <div className="details-info-section">
            <div className="info-block">
              <h3>About this Event</h3>
              <p>
                {selectedEvent.info ||
                  selectedEvent.pleaseNote ||
                  'Join us for this exciting event. Secure your spot now to ensure admission.'}
              </p>
            </div>

            {selectedEvent.pleaseNote && selectedEvent.info && (
              <div className="info-block">
                <h3>Please Note</h3>
                <p>{selectedEvent.pleaseNote}</p>
              </div>
            )}

            <div className="info-block">
              <h3>Location & Venue</h3>
              <p>
                <strong>{venue}</strong>
              </p>
              <p style={{ color: '#64748b', marginTop: '4px' }}>
                {locationString || 'Detailed address will be provided on confirmation.'}
              </p>
            </div>

            {selectedEvent.url && (
              <div>
                <a
                  href={selectedEvent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  View on Official Ticketmaster Page ↗
                </a>
              </div>
            )}
          </div>

          {/* Sidebar / Registration Action */}
          <div className="details-sidebar">
            <div className="registration-card">
              <h3>Event Details</h3>

              <div className="meta-list">
                <div className="meta-row">
                  <span className="meta-icon">📅</span>
                  <div>
                    <span className="meta-label">Date & Time</span>
                    <span className="meta-value">
                      {eventDate} {eventTime && `at ${eventTime}`}
                    </span>
                  </div>
                </div>

                <div className="meta-row">
                  <span className="meta-icon">📍</span>
                  <div>
                    <span className="meta-label">Venue</span>
                    <span className="meta-value">{venue}</span>
                  </div>
                </div>

                <div className="meta-row">
                  <span className="meta-icon">🏷️</span>
                  <div>
                    <span className="meta-label">Category</span>
                    <span className="meta-value">{category}</span>
                  </div>
                </div>

                <div className="meta-row">
                  <span className="meta-icon">💵</span>
                  <div>
                    <span className="meta-label">Estimated Price</span>
                    <span className="meta-value">{price}</span>
                  </div>
                </div>
              </div>

              {/* Registration Action Area */}
              {isRegistered ? (
                <div>
                  <div className="alert alert-success" style={{ marginBottom: '12px' }}>
                    ✓ You are registered for this event!
                  </div>
                  <Link
                    to="/my-events"
                    className="btn btn-outline"
                    style={{ width: '100%' }}
                  >
                    View in My Events
                  </Link>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleRegister}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
                  >
                    {isAuthenticated ? 'Register for Event' : 'Sign in to Register'}
                  </button>
                  {!isAuthenticated && (
                    <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginTop: '8px' }}>
                      Free registration. Takes just 10 seconds!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
