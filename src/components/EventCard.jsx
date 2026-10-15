import React from 'react'
import { Link } from 'react-router-dom'
import './EventCard.css'

function EventCard({ event }) {
  // Extract image
  const imageUrl =
    event.images?.find((img) => img.ratio === '16_9')?.url ||
    event.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'

  // Extract date and time
  const eventDate = event.dates?.start?.localDate || 'Date TBA'
  const eventTime = event.dates?.start?.localTime
    ? event.dates.start.localTime.substring(0, 5)
    : ''

  // Venue & city
  const venue = event._embedded?.venues?.[0]?.name || 'Venue TBA'
  const city = event._embedded?.venues?.[0]?.city?.name || ''
  const locationString = city ? `${venue}, ${city}` : venue

  // Category
  const category =
    event.classifications?.[0]?.segment?.name || 'General'

  // Pricing
  const price = event.priceRanges?.[0]
    ? `$${event.priceRanges[0].min} - $${event.priceRanges[0].max}`
    : 'Standard Admission'

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src={imageUrl}
          alt={event.name}
          className="event-image"
          loading="lazy"
        />
      </div>

      <div className="event-content">
        <div className="event-top-row">
          <span className="badge badge-category">{category}</span>
          <span className="event-price">{price}</span>
        </div>

        <h3 className="event-title" title={event.name}>
          {event.name}
        </h3>

        <div className="event-meta">
          <div className="event-meta-item">
            <span className="event-meta-label">Date:</span>
            <span>
              {eventDate} {eventTime && `(${eventTime})`}
            </span>
          </div>

          <div className="event-meta-item">
            <span className="event-meta-label">Venue:</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {locationString}
            </span>
          </div>
        </div>

        <div className="event-card-footer">
          <Link to={`/events/${event.id}`} className="btn btn-outline" style={{ width: '100%' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
