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
      <div className="container" style={{ padding: '50px 20px', textAlign: 'center' }}>
        <div className="alert alert-danger">
          <h3>Event Not Found</h3>
          <p>{error || 'The requested event could not be found.'}</p>
        </div>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>
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
    : 'Standard Admission'

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
        &larr; Back to all events
      </Link>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="details-card">
        {/* Banner Image */}
        <div className="details-banner-wrap">
          <img src={imageUrl} alt={selectedEvent.name} className="details-image" />
        </div>

        {/* Title Header */}
        <div className="details-header-section">
          <span className="badge badge-category">
            {category} {genre ? `/ ${genre}` : ''}
          </span>
          <h1>{selectedEvent.name}</h1>
        </div>

        {/* Details Body */}
        <div className="details-body">
          <div className="details-info-section">
            <div className="info-block">
              <h3>About the Event</h3>
              <p>
                {selectedEvent.info ||
                  selectedEvent.pleaseNote ||
                  'No additional details provided for this event. Register below to secure your attendance.'}
              </p>
            </div>

            {selectedEvent.pleaseNote && selectedEvent.info && (
              <div className="info-block">
                <h3>Important Notes</h3>
                <p>{selectedEvent.pleaseNote}</p>
              </div>
            )}

            <div className="info-block">
              <h3>Venue & Location</h3>
              <p><strong>{venue}</strong></p>
              <p style={{ color: '#64748b', marginTop: '4px' }}>
                {locationString || 'Location details will be confirmed upon registration.'}
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
                  View on Ticketmaster Website
                </a>
              </div>
            )}
          </div>

          {/* Registration Sidebar */}
          <div className="details-sidebar">
            <div className="registration-card">
              <h3>Event Summary</h3>

              <div className="meta-list">
                <div className="meta-row">
                  <span className="meta-label">Date & Time</span>
                  <span className="meta-value">
                    {eventDate} {eventTime && `at ${eventTime}`}
                  </span>
                </div>

                <div className="meta-row">
                  <span className="meta-label">Venue</span>
                  <span className="meta-value">{venue}</span>
                </div>

                <div className="meta-row">
                  <span className="meta-label">Category</span>
                  <span className="meta-value">{category}</span>
                </div>

                <div className="meta-row">
                  <span className="meta-label">Price</span>
                  <span className="meta-value">{price}</span>
                </div>
              </div>

              {isRegistered ? (
                <div>
                  <div className="alert alert-success" style={{ marginBottom: '10px' }}>
                    You are registered for this event.
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
                    style={{ width: '100%', padding: '10px', fontSize: '0.95rem' }}
                  >
                    {isAuthenticated ? 'Register for Event' : 'Login to Register'}
                  </button>
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
