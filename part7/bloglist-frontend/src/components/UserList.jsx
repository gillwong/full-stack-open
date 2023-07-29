import { useQuery } from 'react-query'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {
  const result = useQuery('users', userService.getAll)
  const users = result.isFetched ? result.data : []

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Users</h2>
      <table>
        <thead>
          <tr>
            <td />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList
