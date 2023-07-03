const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('adding a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('kata sandi', saltRounds)
    const user = new User({ username: 'test', name: 'Test User', passwordHash })

    await user.save()
  })

  test('succeeds when username is unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test2',
      name: 'Test User 2',
      password: '12345678',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test(
    'fails with proper status code when username is already taken',
    async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'test',
        name: 'Test User 2',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.error).toContain('expected `username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    }
  )
  
  test(
    'fails with proper status code when username is less than three characters',
    async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'te',
        name: 'Test User 2',
        password: '12345678',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.error).toContain(
        `\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length`
      )

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    }
  )
  
  test(
    'fails with proper status code when password is less than three characters',
    async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'test2',
        name: 'Test User 2',
        password: '12',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.error).toContain(
        '`password` must be at least 3 characters long'
      )

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
    }
  )

  afterAll(async () => {
    await mongoose.connection.close()
  })
})