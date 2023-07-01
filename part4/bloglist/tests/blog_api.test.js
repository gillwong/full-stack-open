const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.initialBlogs) {
    const blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique properties \'id\' of blogs are defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    "title": "Hello Wolrd",
    "author": "Joe Kogh",
    "url": "https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/",
    "likes": 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => ({
    "title": blog.title,
    "author": blog.author,
    "url": blog.url,
    "likes": blog.likes,
  }))

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContainEqual(newBlog)
})

test(
  'a valid blog added without the \'likes\' property has the value 0',
  async () => {
    const newBlog = {
      "title": "Hello There",
      "author": "Ubi Knobi",
      "url": "https://jestjs.io/docs/expect#tocontainitem",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const savedBlog = response.body.find(blog => (
      blog.title === newBlog.title &&
      blog.author === newBlog.author &&
      blog.url === newBlog.url
    ))

    expect(savedBlog.likes).toBe(0)
  }
)

test(
  'a blog without \'title\' or \'url\' properties are not added',
  async () => {
    const newBlog = {
      "author": "Mary Jane",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  }
)

test('a blog with valid id can be deleted', async () => {
  const blogsBefore = await helper.blogsInDb()
  const blogToDelete = blogsBefore[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAfter.map(blog => ({
    "title": blog.title,
    "author": blog.author,
    "url": blog.url,
    "likes": blog.likes,
  }))
  expect(contents).not.toContainEqual({
    "title": blogToDelete.title,
    "author": blogToDelete.author,
    "url": blogToDelete.url,
    "likes": blogToDelete.likes,
  })
})

test('number of likes in a blog post can be updated', async () => {
  const blogsBefore = await helper.blogsInDb()
  const blogToUpdate = blogsBefore[0]
  const newBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
  
  const blogsAfter = await helper.blogsInDb()
  const updatedBlog = blogsAfter.find(blog => blog.id === blogToUpdate.id)
  expect(updatedBlog).toMatchObject(newBlog)
})

afterAll(async () => {
  await mongoose.connection.close()
})