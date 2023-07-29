import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useContext } from 'react'
import { useDisplayNotification } from './components/NotificationContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import UserContext from './components/UserContext'
import loginService from './services/login'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      notify(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success',
      )
      queryClient.invalidateQueries('blogs')
    },
    onError: (e) => handleError(e),
  })
  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      const { id } = updatedBlog
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) =>
          blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 },
        ),
      )
    },
    onError: (e) => handleError(e),
  })
  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => queryClient.invalidateQueries('blogs'),
    onError: (e) => handleError(e),
  })

  const result = useQuery('blogs', blogService.getAll)
  const blogs = result.isFetched ? result.data : []

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notify = useDisplayNotification()
  const [user, userDispatch] = useContext(UserContext)

  const blogFormRef = useRef()
  const navigate = useNavigate()

  const sortedBlogs = [...blogs].sort(
    (blog1, blog2) => blog2.likes - blog1.likes,
  )

  useEffect(() => userDispatch({ type: 'INIT' }), [userDispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      userDispatch({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Wrong credentials')
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => userDispatch({ type: 'LOGOUT' })

  const createBlog = async (blog) => {
    newBlogMutation.mutate(blog)
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id)

    updateBlogMutation.mutate({
      id,
      username: blogToUpdate.user.username,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url,
    })
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id)
    if (
      !window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`,
      )
    ) {
      return
    }
    removeBlogMutation.mutate(id)
    navigate('/')
  }

  const handleError = (exception) => {
    if (
      exception.name === 'AxiosError' &&
      exception.response?.data?.error === 'token expired'
    ) {
      notify('token expired. Please log in again', 'error')
      handleLogout()
      return
    }
  }

  if (user === null) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <h2 className="text-3xl font-bold mb-5">log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <nav className="bg-gray-300 absolute top-0 left-0 w-screen p-2">
        <Link className="mx-1 px-2 py-0.5 bg-slate-400 rounded-md" to="/">
          blogs
        </Link>
        <Link className="mx-1 px-2 py-0.5 bg-slate-400 rounded-md" to="/users">
          users
        </Link>
        <span className="h-full w-20 bg-slate-600 rounded-sm mx-2 text-slate-600">
          l
        </span>
        <span style={{ marginRight: '5px' }}>{user.name} logged in</span>
        <button
          className="px-2 py-0.5 bg-rose-800 text-white rounded-md"
          type="button"
          onClick={handleLogout}
        >
          logout
        </button>
      </nav>
      <h2 className="text-3xl font-bold mb-5">blog app</h2>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
              </Togglable>
              <div>
                {result.isFetched &&
                  sortedBlogs.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      user={user}
                      handleLike={() => likeBlog(blog.id)}
                      handleDelete={() => removeBlog(blog.id)}
                    />
                  ))}
              </div>
            </>
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails handleLike={likeBlog} handleDelete={removeBlog} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
