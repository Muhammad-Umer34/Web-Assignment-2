import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

// Create Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
