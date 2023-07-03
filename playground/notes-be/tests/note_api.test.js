const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')
const User = require('../models/user')

beforeEach(async () => {
  await Note.deleteMany({})
  for (const element of helper.initialNotes) {
    const noteObject = new Note(element)
    await noteObject.save()
  }
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(res => res.content)
    expect(contents).toContain('CSS is amazing!')
  })
})

describe('addition of a new note', () => {
  let token

  beforeEach(async () => {
    await User.deleteMany({})
    token = undefined

    const testUser = {
      username: 'test',
      name: 'Test User',
      password: 'test',
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(testUser.password, saltRounds)

    const userObject = new User({
      username: testUser.username,
      name: testUser.name,
      passwordHash
    })
    const savedUser = await userObject.save()

    token = jwt.sign(
      {
        username: savedUser.username,
        id: savedUser._id,
      },
      process.env.SECRET
    )
  })

  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    const contents = response.body.map(res => res.content)

    expect(response.body).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('fails with status code 400 if data invalid', async () => {
    const newNote = { important: true }

    await api
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(newNote)
      .expect(400)

    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with status code 404 if note does not exist', async () => {
    const validNoneexistingId = await helper.nonExistingId()

    await api
      .get(`/api/notes/${validNoneexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '1'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

    const contents = notesAtEnd.map(res => res.content)
    expect(contents).not.toContain(noteToDelete.content)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})