import { SAMPLE_EVENTS } from './mockEvents'

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

const getApiKey = () => {
  return import.meta.env.VITE_TICKETMASTER_API_KEY || ''
}

export async function fetchTicketmasterEvents({ keyword = '', classification = '' } = {}) {
  const apiKey = getApiKey()

  if (!apiKey || apiKey === 'your_ticketmaster_api_key_here') {
    let filtered = [...SAMPLE_EVENTS]

    if (keyword.trim()) {
      const q = keyword.toLowerCase()
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.classifications?.[0]?.segment?.name?.toLowerCase().includes(q)
      )
    }

    if (classification && classification !== 'All') {
      filtered = filtered.filter(
        (e) =>
          e.classifications?.[0]?.segment?.name?.toLowerCase() === classification.toLowerCase()
      )
    }

    return {
      events: filtered,
      isDemo: true,
      message: 'Notice: Using sample events. Set VITE_TICKETMASTER_API_KEY in .env for live API data.',
    }
  }

  try {
    let url = `${BASE_URL}/events.json?apikey=${apiKey}&size=20&sort=date,asc`

    if (keyword.trim()) {
      url += `&keyword=${encodeURIComponent(keyword.trim())}`
    }

    if (classification && classification !== 'All') {
      url += `&classificationName=${encodeURIComponent(classification)}`
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Ticketmaster API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const events = data._embedded?.events || []

    return {
      events,
      isDemo: false,
      message: null,
    }
  } catch (error) {
    console.error('Failed to fetch from Ticketmaster API:', error)

    let filtered = [...SAMPLE_EVENTS]
    if (keyword.trim()) {
      filtered = filtered.filter((e) =>
        e.name.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    return {
      events: filtered,
      isDemo: true,
      message: `Failed to connect to Ticketmaster API (${error.message}). Displaying sample events.`,
    }
  }
}

export async function fetchTicketmasterEventById(id) {
  const apiKey = getApiKey()

  if (id.startsWith('mock-') || !apiKey || apiKey === 'your_ticketmaster_api_key_here') {
    const found = SAMPLE_EVENTS.find((e) => e.id === id)
    if (found) return found
  }

  if (!apiKey) {
    const found = SAMPLE_EVENTS.find((e) => e.id === id)
    return found || null
  }

  try {
    const response = await fetch(`${BASE_URL}/events/${id}.json?apikey=${apiKey}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch event details (${response.status})`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching event details:', err)
    return SAMPLE_EVENTS.find((e) => e.id === id) || null
  }
}
