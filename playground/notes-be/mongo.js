const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.error('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const database = 'noteApp'

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ujmxp7p.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'JS is !easy',
  important: 'true',
})

// note.save().then(result => {
//   console.log('note saved!', result)
//   mongoose.connection.close()
// })

Note.find({ important: true }).then(result => {
  result.forEach(note => console.log(note))
  mongoose.connection.close()
})