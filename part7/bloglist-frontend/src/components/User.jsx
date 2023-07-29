import { useQuery } from 'react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const result = useQuery('users', userService.getAll)
  const users = result.isFetched ? result.data : []
  const user = users.find((u) => u.id === id)

  if (!user) {
    return <div>User not found.</div>
  }
  return (
    <div className="m-1">
      <h2 className="text-2xl font-bold mb-3">{user.name}</h2>
      <h3 className="text-xl font-bold mb-2">added blogs</h3>
      <ul className="ms-3">
        {user.blogs.map((blog) => (
          <li key={blog.id}> - {blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
