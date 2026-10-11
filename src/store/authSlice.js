import { createSlice } from '@reduxjs/toolkit'

// Read saved user data from localStorage so login stays saved on refresh
const storedUser = JSON.parse(localStorage.getItem('currentUser')) || null
const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []

const initialState = {
  currentUser: storedUser,
  isAuthenticated: !!storedUser,
  users: storedUsers,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload

      // Check if user already exists with same email
      const existingUser = state.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      )

      if (existingUser) {
        state.error = 'An account with this email already exists!'
        return
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      }

      state.users.push(newUser)
      state.currentUser = { id: newUser.id, name: newUser.name, email: newUser.email }
      state.isAuthenticated = true
      state.error = null

      // Save to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(state.users))
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload
      const foundUser = state.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )

      if (foundUser) {
        state.currentUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        }
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
      } else {
        state.error = 'Invalid email or password. Please try again.'
      }
    },

    logoutUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('currentUser')
    },

    clearAuthError: (state) => {
      state.error = null
    },
  },
})

export const { registerUser, loginUser, logoutUser, clearAuthError } = authSlice.actions
export default authSlice.reducer
