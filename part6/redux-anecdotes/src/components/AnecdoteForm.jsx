import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.text.value
    event.target.text.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added '${content}'`, 5000))
  } 
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='text' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm