const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "You are NOT a wizard...",
    "author": "Harry Poffman",
    "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
    "likes": 17,
  },
  {
    "title": "Top 10 Portable CD Players of All Time",
    "author": "Rob Walkman",
    "url": "https://fullstackopen.com/en/part4/testing_the_backend",
    "likes": 15,
  },
  {
    "title": "TF2 Engineer Montage!!!",
    "author": "John Dale",
    "url": "https://www.teamfortress.com/classes.php?class=demoman#movie",
    "likes": 20,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}