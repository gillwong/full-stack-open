import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div className="m-1">
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
          className="border-2 border-slate-500 rounded-md ml-1 px-1"
        />
      </div>
      <div className="m-1">
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          className="border-2 border-slate-500 rounded-md ml-1 px-1"
        />
      </div>
      <div className="m-1">
        url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          required
          className="border-2 border-slate-500 rounded-md ml-1 px-1"
        />
      </div>
      <button
        className="m-1 px-3 py-1 bg-green-600 text-white rounded-md"
        type="submit"
      >
        create
      </button>
    </form>
  )
}

export default BlogForm
