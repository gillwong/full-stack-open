const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const color = type === 'error'
    ? 'red' : 'green'
  
  return (
    <div
      style={{
        color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }}
    >
      {message}
    </div>
  )
}

export default Notification