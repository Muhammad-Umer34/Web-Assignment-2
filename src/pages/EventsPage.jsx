import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEvents,
  setSearchQuery,
  setSelectedCategory,
} from '../store/eventsSlice'
import EventCard from '../components/EventCard'
import './EventsPage.css'

const CATEGORIES = ['All', 'Music', 'Sports', 'Arts & Theatre', 'Comedy', 'Tech']

function EventsPage() {
  const dispatch = useDispatch()
  const { items, status, error, searchQuery, selectedCategory, demoNotice } =
    useSelector((state) => state.events)

  const [localSearch, setLocalSearch] = useState(searchQuery)

  // Fetch events on initial load or category change
  useEffect(() => {
    dispatch(
      fetchEvents({
        keyword: searchQuery,
        classification: selectedCategory === 'All' ? '' : selectedCategory,
      })
    )
  }, [dispatch, selectedCategory])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(setSearchQuery(localSearch))
    dispatch(
      fetchEvents({
        keyword: localSearch,
        classification: selectedCategory === 'All' ? '' : selectedCategory,
      })
    )
  }

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category))
  }

  const handleClearSearch = () => {
    setLocalSearch('')
    dispatch(setSearchQuery(''))
    dispatch(
      fetchEvents({
        keyword: '',
        classification: selectedCategory === 'All' ? '' : selectedCategory,
      })
    )
  }

  return (
    <div className="container">
      {/* Hero Banner */}
      <section className="hero-section">
        <h1 className="hero-title">Discover Exciting Events</h1>
        <p className="hero-subtitle">
          Find and register for concerts, sports matches, theatre, comedy shows, and tech meetups powered by Ticketmaster.
        </p>
      </section>

      {/* Demo API key notice if applicable */}
      {demoNotice && (
        <div className="alert alert-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>ℹ️</span>
          <span>{demoNotice}</span>
        </div>
      )}

      {/* Search and Filters */}
      <section className="filters-bar">
        <form onSubmit={handleSearchSubmit} className="search-row">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by event title, artist, or keywords..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Search
          </button>

          {localSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="btn btn-outline"
            >
              Clear
            </button>
          )}
        </form>

        {/* Category Pills */}
        <div className="category-pills">
          <span className="category-label">Filter by Category:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events Results Section */}
      <section>
        <div className="events-header">
          <h2>
            {selectedCategory === 'All' ? 'Upcoming Events' : `${selectedCategory} Events`}
          </h2>
          <span className="events-count">
            Showing {items.length} {items.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {status === 'loading' && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading events from Ticketmaster...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        {status === 'succeeded' && items.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🎟️</div>
            <h3>No events found</h3>
            <p style={{ color: '#64748b', marginTop: '6px' }}>
              Try searching with another keyword or pick a different category.
            </p>
            <button
              onClick={handleClearSearch}
              className="btn btn-primary"
              style={{ marginTop: '16px' }}
            >
              View All Events
            </button>
          </div>
        )}

        {status === 'succeeded' && items.length > 0 && (
          <div className="events-grid">
            {items.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default EventsPage
