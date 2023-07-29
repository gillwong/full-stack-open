import { createContext, useContext, useReducer } from 'react'
import blogService from '../services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const user = action.payload
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      return user
    }
    case 'LOGOUT': {
      blogService.setToken(null)
      window.localStorage.removeItem('loggedBloglistUser')
      return null
    }
    case 'INIT': {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        return user
      }
      return null
    }
    default:
      throw Error(`Unknown action: ${action.type}`)
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [user, _] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [_, userDispatch] = useContext(UserContext)
  return userDispatch
}

export default UserContext
