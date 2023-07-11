import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> submits with the right blog details', async () => {
  const createBlog = jest.fn()
  const { container } = render(<BlogForm createBlog={createBlog} />)
  const user = userEvent.setup()

  const titleInput = container.querySelector('input[name="title"]')
  const authorInput = container.querySelector('input[name="author"]')
  const urlInput = container.querySelector('input[name="url"]')

  const blog = {
    title: 'Test Blog',
    author: 'Test User',
    url: 'https://stackoverflow.com/questions/65986454/how-to-fetch-element-with-name-attribute-in-react-testing-library',
  }
  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(blog)
})