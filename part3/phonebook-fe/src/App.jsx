import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  const personsDisplay = persons.filter(
    person => person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!newName) return
    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = {
          ...personToUpdate,
          number: newPhone,
        }

        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            notify(`Modified ${returnedPerson.name}`, 'success')
            setPersons(persons.map(
              person => person.id !== returnedPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewPhone('')
          })
          .catch(error => {
            notify(error.response.data.error, 'error')
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newPhone,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        notify(`Added ${returnedPerson.name}`, 'success')
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        notify(error.response.data.error, 'error')
      })
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if(confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          notify(`Deleted ${person.name}`, 'success')
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          notify(`Information of ${person.name} has already been removed from server`,
                 'error')
          console.log(error)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        type={notification.type}
      />
      <Filter
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName} setNewName={setNewName}
        newPhone={newPhone} setNewPhone={setNewPhone}
        handleSubmit={handleSubmit}
      /> 
      <h3>Numbers</h3>
      <Persons
        personsDisplay={personsDisplay}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App