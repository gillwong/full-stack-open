const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "John Knopes R.",
      "url":
        "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 71,
      "__v": 0
    }
  ]

  const listWithManyBlogs = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "John Knopes R.",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 71,
      "__v": 0
    },
    {
      "_id": "649e790c4426c4c6deda9e6a",
      "title": "You are NOT a wizard...",
      "author": "Harry Poffman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 17,
      "__v": 0
    },
    {
      "_id": "649e79d33be88de2eb935d35",
      "title": "Top 10 Portable CD Players of All Time",
      "author": "Rob Walkman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 153,
      "__v": 0
    },
    {
      "_id": "649e7ab24aabba9f15e97510",
      "title": "TF2 Engineer Montage!!!",
      "author": "John Dale",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 301,
      "__v": 0
    }
  ]

  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(71)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(listWithManyBlogs)).toBe(542)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "John Knopes R.",
      "url":
        "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 71,
      "__v": 0
    }
  ]

  const listWithManyBlogs = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "John Knopes R.",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 71,
      "__v": 0
    },
    {
      "_id": "649e790c4426c4c6deda9e6a",
      "title": "You are NOT a wizard...",
      "author": "Harry Poffman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 176,
      "__v": 0
    },
    {
      "_id": "649e79d33be88de2eb935d35",
      "title": "Top 10 Portable CD Players of All Time",
      "author": "Rob Walkman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 153,
      "__v": 0
    },
  ]

  test('of empty list is null', () => {
    expect(favoriteBlog([])).toBeNull()
  })

  test('when list has only one blog equals to that blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual({
      "title": "Hello Wolrd",
      "author": "John Knopes R.",
      "likes": 71,
    })
  })

  test('of a bigger list to be one of the blog with the most likes', () => {
    expect(favoriteBlog(listWithManyBlogs)).toEqual({
      "title": "You are NOT a wizard...",
      "author": "Harry Poffman",
      "likes": 176,
    })
  })
})

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "John Knopes R.",
      "url":
        "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 71,
      "__v": 0
    }
  ]
  
  const listWithManyBlogs = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "Rob Walkman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 71,
      "__v": 0
    },
    {
      "_id": "649e790c4426c4c6deda9e6a",
      "title": "You are NOT a wizard...",
      "author": "Harry Poffman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 176,
      "__v": 0
    },
    {
      "_id": "649e79d33be88de2eb935d35",
      "title": "Top 10 Portable CD Players of All Time",
      "author": "Rob Walkman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 153,
      "__v": 0
    },
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    },
  ]
  
  test('of empty list is null', () => {
    expect(mostBlogs([])).toBeNull()
  })

  test('when list has only one blog equals to that author\'s blog', () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({
      "author": "John Knopes R.",
      "blogs": 1,
    })
  })

  test('of a bigger list to be one of the authors with the most blogs', () => {
    expect(mostBlogs(listWithManyBlogs)).toEqual({
      "author": "Robert C. Martin",
      "blogs": 3,
    })
  })
})

describe('most likes', () => {
  const listWithOneBlog = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "John Knopes R.",
      "url":
        "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 71,
      "__v": 0
    }
  ]
  
  const listWithManyBlogs = [
    {
      "_id": "649e77b0ea9ad5b3323c9301",
      "title": "Hello Wolrd",
      "author": "Rob Walkman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 7,
      "__v": 0
    },
    {
      "_id": "649e790c4426c4c6deda9e6a",
      "title": "You are NOT a wizard...",
      "author": "Harry Poffman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 1,
      "__v": 0
    },
    {
      "_id": "649e79d33be88de2eb935d35",
      "title": "Top 10 Portable CD Players of All Time",
      "author": "Rob Walkman",
      "url": "https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly",
      "likes": 3,
      "__v": 0
    },
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 9,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    },
  ]
  test('of empty list is null', () => {
    expect(mostLikes([])).toBeNull()
  })

  test('when list has only one blog equals to that author', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      "author": "John Knopes R.",
      "likes": 71,
    })
  })

  test('of a bigger list to be one of the authors with the most likes', () => {
    expect(mostLikes(listWithManyBlogs)).toEqual({
      "author": "Robert C. Martin",
      "likes": 21,
    })
  })
})