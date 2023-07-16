import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'DISPLAY':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notfication, notificationDispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[notfication, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notificationValue, _] = useContext(NotificationContext)
  return notificationValue
}

export const useNotificationDispatch = () => {
  const [_, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export default NotificationContext