import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({
        type: 'DISPLAY',
        payload: `anecdote '${newAnecdote.content}' created`,
      })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    },
    onError: () => {
      dispatch({
        type: 'DISPLAY',
        payload: 'too short anecdote, must have length 5 or more',
      })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    }
  })
  const dispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
