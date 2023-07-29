import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useState } from 'react'

const CommentForm = ({ id }) => {
  const queryClient = useQueryClient()

  const newCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.comment(id, comment),
    onSuccess: () => queryClient.invalidateQueries('blogs'),
  })

  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    newCommentMutation.mutate({
      id,
      comment: e.target.content.value,
    })
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border-2 border-slate-500 rounded-md me-1 px-1"
        type="text"
        name="content"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="px-3 py-0.5 m-1 bg-green-600 rounded-md text-white"
        type="submit"
      >
        add comment
      </button>
    </form>
  )
}

export default CommentForm
