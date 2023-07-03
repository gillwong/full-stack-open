import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [notificationId, setNotificationId] = useState(undefined)

  const blogFormRef = useRef()

  const sortedBlogs = [...blogs].sort((blog1, blog2) => {
    if (blog1.likes < blog2.likes) {
      return 1
    }
    if (blog1.likes > blog2.likes) {
      return -1
    }
    return 0
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.error('Wrong credentials')
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog)

      setBlogs(blogs.concat({
        ...savedBlog,
        user: {
          username: user.username,
          name: user.name,
        },
      }))
      notify(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        'success'
      )
    } catch (exception) {
      handleError(exception)
    }
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = async (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)

    try {
      await blogService.update(id, {
        username: blogToUpdate.user.username,  // will be removed in the backend
        likes: blogToUpdate.likes + 1,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url,
      })

      setBlogs(blogs.map(blog => blog.id !== id
        ? blog
        : { ...blog, likes: blog.likes + 1 }
      ))
    } catch (exception) {
      handleError(exception)
    }
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    if (!window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )) { return }

    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (exception) {
      handleError(exception)
    }
  }

  const notify = (message, status) => {
    if (notification) {
      clearTimeout(notificationId)
    }
    setNotification({ message, status })
    setNotificationId(setTimeout(() => setNotification(null), 5000))
  }

  const handleError = (exception) => {
    if (exception.name === 'AxiosError' && exception.response?.data?.error === 'token expired') {
      notify('token expired. Please log in again', 'error')
      handleLogout()
      return
    }
    console.error(exception)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button type='button' onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={() => likeBlog(blog.id)}
          handleDelete={() => removeBlog(blog.id)}
        />
      )}
    </div>
  )
}

export default App