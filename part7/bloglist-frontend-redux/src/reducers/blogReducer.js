import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { removeUser } from './userReducer'
import { setNotification } from './notificationReducer'

const handleError = (exception) => (dispatch) => {
  if (
    exception.name === 'AxiosError' &&
    exception.response?.data?.error === 'token expired'
  ) {
    dispatch(
      setNotification('token expired. Please log in again', 'error', 5000),
    )
    dispatch(removeUser())
    return
  }
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    modifyBlog(state, action) {
      const { id, blog: modifiedBlog } = action.payload
      return state.map((blog) => (blog.id !== id ? blog : modifiedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, modifyBlog, removeBlog } =
  blogSlice.actions

export const intializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const addBlog = (blog, user) => async (dispatch) => {
  try {
    const savedBlog = await blogService.create(blog)
    dispatch(
      appendBlog({
        ...savedBlog,
        user: {
          username: user.username,
          name: user.name,
        },
      }),
    )
    dispatch(
      setNotification(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        'success',
        5000,
      ),
    )
  } catch (exception) {
    dispatch(handleError(exception))
  }
}

export const likeBlog = (id) => async (dispatch, getState) => {
  const { blogs } = getState()
  const blogToUpdate = blogs.find((blog) => blog.id === id)

  try {
    await blogService.update(id, {
      username: blogToUpdate.user.username,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url,
    })
    dispatch(
      modifyBlog({
        id,
        blog: { ...blogToUpdate, likes: blogToUpdate.likes + 1 },
      }),
    )
  } catch (exception) {
    dispatch(handleError(exception))
  }
}

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  } catch (exception) {
    dispatch(handleError(exception))
  }
}

export default blogSlice.reducer
