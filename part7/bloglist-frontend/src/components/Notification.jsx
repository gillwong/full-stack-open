import { useNotificationValue } from './NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  return <div className={notification.status}>{notification.message}</div>
}

export default Notification
