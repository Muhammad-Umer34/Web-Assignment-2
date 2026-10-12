import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchTicketmasterEvents,
  fetchTicketmasterEventById,
} from '../services/ticketmasterApi'

// Async Thunk to fetch events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async ({ keyword = '', classification = '' } = {}, { rejectWithValue }) => {
    try {
      const result = await fetchTicketmasterEvents({ keyword, classification })
      return result
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// Async Thunk to fetch single event details
export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (eventId, { rejectWithValue }) => {
    try {
      const event = await fetchTicketmasterEventById(eventId)
      if (!event) throw new Error('Event not found')
      return event
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedEvent: null,
  detailStatus: 'idle',
  searchQuery: '',
  selectedCategory: 'All',
  demoNotice: null,
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null
      state.detailStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch events
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.events
        state.demoNotice = action.payload.message
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to load events'
      })

      // Fetch single event
      .addCase(fetchEventDetails.pending, (state) => {
        state.detailStatus = 'loading'
        state.error = null
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selectedEvent = action.payload
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.payload || 'Failed to load event details'
      })
  },
})

export const { setSearchQuery, setSelectedCategory, clearSelectedEvent } =
  eventsSlice.actions

export default eventsSlice.reducer
