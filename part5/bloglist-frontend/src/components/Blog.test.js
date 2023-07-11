import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'Blog About Testing',
    author: 'Superuser',
    url: 'https://fullstackopen.com/en/part5/testing_react_apps',
    likes: 19,
    user: {
      username: 'root',
      name: 'Superuser',
    },
  }
  const user = { username: 'root' }
  const handleLike = jest.fn()
  const handleDelete = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    ).container
  })

  test('renders title and author, but not url and likes by default', () => {
    const div = screen.getByText(`${blog.title} ${blog.author}`, { exact: false })
    expect(div).toBeInTheDocument()

    const detailsDiv = container.querySelector('.blogDetails')
    expect(detailsDiv).not.toBeInTheDocument()
  })

  test(
    'render title, author, url and likes when view button is clicked',
    async () => {
      const div = screen.getByText(`${blog.title} ${blog.author}`, { exact: false })
      expect(div).toBeInTheDocument()

      const user = userEvent.setup()
      const viewButton = screen.getByText('view')
      await user.click(viewButton)

      const detailsDiv = container.querySelector('.blogDetails')
      expect(detailsDiv).toBeInTheDocument()
    }
  )

  test('handleLike is called correctly', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})