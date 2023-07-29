const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const rawBlog = blogs.reduce(
    (prev, curr) => curr.likes > prev.likes ? curr : prev
  )
  return {
    title: rawBlog.title,
    author: rawBlog.author,
    likes: rawBlog.likes,
  } 
}

const mostBlogs = (blogs) => blogs.reduce(
  (prev, curr) => {
    if (!prev.result) {
      return { ...prev, result: {
        author: curr.author,
        blogs: 1,
      }}
    }
    
    let ret = { ...prev }
    if (ret.blogCount[curr.author]) {
      ++ret.blogCount[curr.author]
    } else {
      ret.blogCount[curr.author] = 1
    }

    if (ret.blogCount[curr.author] > ret.result.blogs) {
      ret.result.author = curr.author
      ret.result.blogs = ret.blogCount[curr.author]
    }
    return ret
  },
  { blogCount: {}, result: null }
).result

const mostLikes = (blogs) => blogs.reduce(
  (prev, curr) => {
    if (!prev.result) {
      return { ...prev, result: {
        author: curr.author,
        likes: curr.likes,
      }}
    }
    
    let ret = { ...prev }
    if (ret.likeCount[curr.author]) {
      ret.likeCount[curr.author] += curr.likes
    } else {
      ret.likeCount[curr.author] = curr.likes
    }

    if (ret.likeCount[curr.author] > ret.result.likes) {
      ret.result.author = curr.author
      ret.result.likes = ret.likeCount[curr.author]
    }
    return ret
  },
  { likeCount: {}, result: null }
).result

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}