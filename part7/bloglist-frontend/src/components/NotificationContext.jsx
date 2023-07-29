import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY':
      if (state?.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        message: action.payload.message,
        status: action.payload.status,
        timeoutId: action.payload.timeoutId,
      }
    case 'CLEAR':
      return null
    default:
      throw Error(`Unknown action: ${action.type}`)
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notfication, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  )
  return (
    <NotificationContext.Provider value={[notfication, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notfication, _] = useContext(NotificationContext)
  return notfication
}

export const useNotificationDispatch = () => {
  const [_, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export const useDisplayNotification = () => {
  const dispatch = useNotificationDispatch()
  const notify = (message, status) => {
    const timeoutId = setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    dispatch({
      type: 'DISPLAY',
      payload: { message, status, timeoutId },
    })
  }
  return notify
}

export default NotificationContext
