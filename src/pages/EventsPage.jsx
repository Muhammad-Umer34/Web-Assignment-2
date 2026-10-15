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
      {/* Page Header */}
      <div className="page-header">
        <h1>Events</h1>
        <p>Explore upcoming events, concerts, games, and shows.</p>
      </div>

      {demoNotice && (
        <div className="alert alert-info">
          {demoNotice}
        </div>
      )}

      {/* Search and Filters */}
      <section className="filters-bar">
        <form onSubmit={handleSearchSubmit} className="search-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search by event title, artist, or keywords..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />

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

        {/* Categories */}
        <div className="category-pills">
          <span className="category-label">Category:</span>
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

      {/* Events Results */}
      <section>
        <div className="events-header">
          <h2>
            {selectedCategory === 'All' ? 'Available Events' : `${selectedCategory} Events`}
          </h2>
          <span className="events-count">
            {items.length} {items.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {status === 'loading' && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="alert alert-danger">
            Error loading events: {error}
          </div>
        )}

        {status === 'succeeded' && items.length === 0 && (
          <div className="empty-state">
            <h3>No events found</h3>
            <p style={{ color: '#64748b', marginTop: '4px' }}>
              Try searching with another keyword or pick a different category.
            </p>
            <button
              onClick={handleClearSearch}
              className="btn btn-primary"
              style={{ marginTop: '14px' }}
            >
              Reset Filters
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
