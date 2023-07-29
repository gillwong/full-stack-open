import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {
  addBlog,
  deleteBlog,
  intializeBlogs,
  likeBlog,
} from './reducers/blogReducer'
import { initializeUser, loginUser, removeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const sortedBlogs = [...blogs].sort(
    (blog1, blog2) => blog2.likes - blog1.likes,
  )

  useEffect(() => {
    dispatch(intializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => dispatch(removeUser())

  const createBlog = async (blog) => {
    dispatch(addBlog(blog, user))
    blogFormRef.current.toggleVisibility()
  }

  const handleLikeBlog = (id) => dispatch(likeBlog(id))

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id)
    if (
      !window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`,
      )
    ) {
      return
    }
    dispatch(deleteBlog(id))
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
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
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={() => handleLikeBlog(blog.id)}
          handleDelete={() => removeBlog(blog.id)}
        />
      ))}
    </div>
  )
}

export default App
