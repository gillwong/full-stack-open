import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { removeNotification, setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      return user
    },
    initializeUser() {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        return user
      }
      return null
    },
    removeUser() {
      blogService.setToken(null)
      window.localStorage.removeItem('loggedBloglistUser')
      return null
    },
  },
})

export const { setUser, initializeUser, removeUser } = userSlice.actions

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
    dispatch(removeNotification())
  } catch (exception) {
    dispatch(setNotification('wrong username or password', 'error', 5000))
  }
}

export default userSlice.reducer
