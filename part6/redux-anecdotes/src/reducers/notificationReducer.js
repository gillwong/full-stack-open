import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    displayNotification(state, action) {
      const message = action.payload
      return message
    },
    removeNotification(state, action) {
      return null
    },
  },
})

export const { displayNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, delay) => async (dispatch) => {
  dispatch(displayNotification(message))
  setTimeout(() => dispatch(removeNotification()), delay)
}

export default notificationSlice.reducer