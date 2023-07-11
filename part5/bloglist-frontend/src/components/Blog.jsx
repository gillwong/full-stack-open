import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [compactVisiblity, setCompactVisiblity] = useState(true)

  const toggleVisibility = () => setCompactVisiblity(!compactVisiblity)

  const blogDetails = () => (
    <div className='blogDetails'>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div>
        likes {blog.likes}
        <button type="button" onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {user.username === blog.user.username
        && <button type="button" onClick={handleDelete}>remove</button>}
    </div>
  )

  return (
    <div style={blogStyle} data-cy="blog">
      {blog.title} {blog.author}
      <button type="button" onClick={toggleVisibility}>
        {compactVisiblity ? 'view' : 'hide'}
      </button>
      {!compactVisiblity && blogDetails() }
    </div>
  )
}

export default Blog