import React from 'react'
import { Link } from 'react-router-dom'
import './EventCard.css'

function EventCard({ event }) {
  // Safe extraction of event image
  const imageUrl =
    event.images?.find((img) => img.ratio === '16_9')?.url ||
    event.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'

  // Safe extraction of date and time
  const eventDate = event.dates?.start?.localDate || 'Date TBA'
  const eventTime = event.dates?.start?.localTime
    ? event.dates.start.localTime.substring(0, 5)
    : ''

  // Venue & city info
  const venue = event._embedded?.venues?.[0]?.name || 'Venue TBA'
  const city = event._embedded?.venues?.[0]?.city?.name || ''
  const locationString = city ? `${venue}, ${city}` : venue

  // Category segment
  const category =
    event.classifications?.[0]?.segment?.name || 'General Event'

  // Pricing
  const price = event.priceRanges?.[0]
    ? `$${event.priceRanges[0].min} - $${event.priceRanges[0].max}`
    : 'Free / See details'

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src={imageUrl}
          alt={event.name}
          className="event-image"
          loading="lazy"
        />
        <span className="event-category-badge">{category}</span>
      </div>

      <div className="event-content">
        <h3 className="event-title" title={event.name}>
          {event.name}
        </h3>

        <div className="event-meta">
          <div className="event-meta-item">
            <span>📅</span>
            <span>
              {eventDate} {eventTime && `at ${eventTime}`}
            </span>
          </div>

          <div className="event-meta-item">
            <span>📍</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {locationString}
            </span>
          </div>
        </div>

        <div className="event-card-footer">
          <span className="event-price">{price}</span>
          <Link to={`/events/${event.id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
