const PersonForm = ({
  newName, setNewName, newPhone, setNewPhone, handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input 
                value={newName}
                onChange={e => setNewName(e.target.value)}
              /><br />
        number: <input
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm