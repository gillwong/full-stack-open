import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useUserValue } from './UserContext'
import CommentForm from './CommentForm'

const BlogDetails = ({ handleLike, handleDelete }) => {
  const { id } = useParams()
  const result = useQuery('blogs', blogService.getAll)
  const blogs = result.isFetched ? result.data : []
  const blog = blogs.find((b) => b.id === id)

  const user = useUserValue()

  if (!blog) {
    return <div>Blog not found.</div>
  }
  return (
    <div className="m-1">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <a
        href={blog.url}
        target="_blank"
        rel="noreferrer"
        className="text-indigo-500 underline"
      >
        {blog.url}
      </a>
      <div>
        likes {blog.likes}
        <button
          className="m-1 px-2 py-0.5 bg-sky-500 rounded-md text-white"
          type="button"
          onClick={() => handleLike(id)}
        >
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username && (
        <button
          className="m-1 px-2 py-1 bg-rose-500 rounded-md text-white"
          type="button"
          onClick={() => handleDelete(id)}
        >
          remove
        </button>
      )}
      <h3 className="text-xl font-bold mb-3 mt-5">comments</h3>
      <CommentForm id={id} />
      <ul className="ms-3">
        {blog.comments.map((comment) => (
          <li key={comment.id}> - {comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
