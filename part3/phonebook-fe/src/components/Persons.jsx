const Persons = ({ personsDisplay, handleDelete }) => {
  return (
    <div>
      {personsDisplay.map(person => (
        <p key={person.id} style={{ margin: 0 }}>
          {person.name} {person.number}
          <button type="button" onClick={() => handleDelete(person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default Persons