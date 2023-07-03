const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body, user } = request
  if (!user) {
    return response.status(400).json({
      error: 'invalid user id',
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request
  if (!user) {
    return response.status(400).json({
      error: 'invalid user id',
    })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({
      error: 'invalid blog id',
    })
  } else if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({
      error: 'wrong user id',
    })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      { ...request.body },
      { new: true, runValidators: true, context: 'query' }
    )
  response.json(updatedBlog)
})

module.exports = blogsRouter