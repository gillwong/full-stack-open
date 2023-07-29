import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    displayNotification(state, action) {
      const { message, status, timeoutId } = action.payload
      return { message, status, timeoutId }
    },
    removeNotification() {
      return null
    },
  },
})

export const {
  displayNotification,
  removeNotification,
} = notificationSlice.actions

export const setNotification = (message, status, delay) => async (dispatch, getState) => {
  const currentState = getState()
  if (currentState.notification?.timeoutId) {
    clearTimeout(currentState.notification.timeoutId)
  }
  const timeoutId = setTimeout(() => dispatch(removeNotification()), delay)
  dispatch(displayNotification({ message, status, timeoutId }))
}

export default notificationSlice.reducer