import { createSlice } from '@reduxjs/toolkit'

// Read persisted registrations from localStorage
const storedRegistrations =
  JSON.parse(localStorage.getItem('eventRegistrations')) || []

const initialState = {
  registrations: storedRegistrations,
  successMessage: null,
  errorMessage: null,
}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const {
        eventId,
        eventName,
        eventDate,
        eventTime,
        eventVenue,
        eventCity,
        eventImage,
        eventCategory,
        userEmail,
        userName,
      } = action.payload

      // Check if user is already registered for this exact event
      const alreadyRegistered = state.registrations.find(
        (reg) => reg.eventId === eventId && reg.userEmail === userEmail
      )

      if (alreadyRegistered) {
        state.errorMessage = 'You are already registered for this event!'
        state.successMessage = null
        return
      }

      // Determine if event is upcoming or past
      const today = new Date().toISOString().split('T')[0]
      const isPast = eventDate && eventDate < today
      const status = isPast ? 'completed' : 'upcoming'

      const newRegistration = {
        id: `reg-${Date.now()}`,
        eventId,
        eventName,
        eventDate,
        eventTime,
        eventVenue,
        eventCity,
        eventImage,
        eventCategory,
        userEmail,
        userName,
        registeredAt: new Date().toISOString(),
        status,
      }

      state.registrations.push(newRegistration)
      state.successMessage = `Great news! You have successfully registered for "${eventName}".`
      state.errorMessage = null

      // Save to localStorage
      localStorage.setItem(
        'eventRegistrations',
        JSON.stringify(state.registrations)
      )
    },

    cancelRegistration: (state, action) => {
      const regId = action.payload
      const regToRemove = state.registrations.find((r) => r.id === regId)

      state.registrations = state.registrations.filter((r) => r.id !== regId)
      state.successMessage = regToRemove
        ? `Registration for "${regToRemove.eventName}" has been cancelled.`
        : 'Registration cancelled.'
      state.errorMessage = null

      // Save to localStorage
      localStorage.setItem(
        'eventRegistrations',
        JSON.stringify(state.registrations)
      )
    },

    clearRegistrationFeedback: (state) => {
      state.successMessage = null
      state.errorMessage = null
    },
  },
})

export const {
  registerForEvent,
  cancelRegistration,
  clearRegistrationFeedback,
} = registrationsSlice.actions

export default registrationsSlice.reducer
